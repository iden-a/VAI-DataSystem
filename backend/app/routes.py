# Define all your Flask routes (API endpoints)
from flask import Blueprint, request, jsonify, send_file, current_app

from firebase_admin import auth, firestore
import io
import zipfile
import os
import pandas as pd
from app.models import UserSignUp, SurveyResponse


from app.utils import SurveyAnalyzer, load_responses_from_firestore, save_graphs_to_pdf, clean_firestore_responses

main = Blueprint('main', __name__)

question_map = {
    "q1": "Before this installation, how often did you visit this site?",
    "q2": "Since the installation, how often do you visit this site?",
    "q3": "On average, how much time do you spend at this site per visit?",
    "q4": "What is your age group?",
    "q5": "What is your gender?",
    "q6": "What is your race/ethnicity?",
    "q7": "What is your zip code?",
    "q8": "How welcome do you feel on this site?",
    "q9": "How safe do you feel on this site?",
    "q10": "How comfortable do you feel on this site?",
    "q11": "How positive is your overall experience at this site?",
    "q12": "What activity best describes your time spent at this site?",
    "q13": "Has this installation made you more interested in exploring the surrounding neighborhood?",
}

@main.route('/')
def health_check():
    return jsonify({"message": "Hello, VAI project!"})

# submitting a survey response
@main.route('/submit-survey', methods=['POST'])
def submit_survey():
    response_data = request.json
    raw_responses = response_data.get('responses')
    responses = {}

    for key, value in raw_responses.items():
        # If it's a list with more than one item, keep it as is (for checkboxes)
        if isinstance(value, list):
            if len(value) > 1:
                responses[key] = value
            elif len(value) == 1:
                responses[key] = value[0]  # Convert single-item list to a string
            else:
                responses[key] = ""  # Empty list becomes empty string
        else:
            responses[key] = value  # In case it's already a string
            
    print("Received survey submission response_data:", response_data)

    installation_id = response_data.get('installationId')
    responses = response_data.get('responses')

    survey_response = SurveyResponse(responses, installation_id)
    
    try:
        current_app.db.collection('surveyResponses').add(survey_response.to_dict())
        print("Survey response saved successfully to Firestore!")  # Added success print
        return jsonify({"message": "Survey submitted", "survey responses": responses}), 200

    except Exception as e:
        print("Error saving survey response:", str(e))
        return jsonify({"error": str(e)}), 400


# creating a new user
@main.route('/register-user', methods=['POST'])
def register_user():
    user_data = request.json
    first_name = user_data.get('firstName')
    last_name = user_data.get('lastName')
    email = user_data.get('email')
    password = user_data.get('password')

    # Basic validation, will go in depth in the frontend!
    if not all([first_name, last_name, email, password]):
        return jsonify({"error": "Missing required fields"}), 400
    
    user = UserSignUp(first_name, last_name, email, password)

    try:
        # Creating the user in Firebase Auth
        user_record = auth.create_user(
            email=user.email,
            password=user.password,
            display_name=f"{user.first_name} {user.last_name}"
        )

        # Store user details in Firestore
        current_app.db.collection('users').document(user_record.uid).set(user.to_dict(user_record.uid))
        return jsonify({"message": "User created successfully", "uid": user_record.uid}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# user logging in
@main.route('/login', methods=['POST'])
def login_user():
    user_data = request.json
    email = user_data.get('email')
    password = user_data.get('password')

    # Basic validation, will go in depth in the frontend!
    if not all([email, password]):
        return jsonify({"error": "Missing required fields"}), 400
    

    try:
        # Retrieving the user by email
        user = auth.get_user_by_email(email)

        # Authentication credential for users
        jwt_token = auth.create_custom_token(user.uid)

        # Fetch extra user info from Firestore
        db = firestore.client()
        user_doc = db.collection('users').document(user.uid).get()

        if user_doc.exists:
            user_info = user_doc.to_dict()
            first_name = user_info.get('firstName', '')
            last_name = user_info.get('lastName', '')
        else:
            first_name = ''
            last_name = ''

        return jsonify({"message": "User logged in successfully", 
                        "jwt_token": jwt_token.decode(),
                        "user" : {
                            "email" : user.email,
                            "first_name" : first_name,
                            "last_name" : last_name
                        }
                        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@main.route('/get-survey-responses', methods=['GET'])
def get_survey_responses():
    try:
        # Access Firestore from current_app
        db = current_app.db
        responses_ref = db.collection('surveyResponses')
        docs = responses_ref.stream()

        responses = []
        for doc in docs:
            response = doc.to_dict()
            response['id'] = doc.id  # Include document ID if needed
            responses.append(response)

        return jsonify(responses), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@main.route('/generate-report', methods=['GET'])
def generate_report():
    try:
        raw_responses = load_responses_from_firestore()
        responses = clean_firestore_responses(raw_responses, question_map)
        analyzer = SurveyAnalyzer(responses, question_map)

        if not responses:
            return jsonify({"error": "No survey responses found to generate report."}), 400

        analyzer = SurveyAnalyzer(responses, question_map)

        print(f"Sample Firestore response: {responses[:2]}")
        csv_path = 'survey_summary.csv'
        #excel_path = 'survey_summary.xlsx'
        pdf_path = 'survey_graphs_summary.pdf'

        analyzer.export_summary_csv(csv_path)
        #analyzer.export_summary_excel(excel_path)
        analyzer.generate_graphs('survey_graphs')
        save_graphs_to_pdf('survey_graphs', pdf_path, question_map)

        memory_file = io.BytesIO()
        with zipfile.ZipFile(memory_file, 'w') as zf:
            zf.write(csv_path)
            #zf.write(excel_path)
            zf.write(pdf_path)

        memory_file.seek(0)
        
        return send_file(memory_file, mimetype='application/zip', as_attachment=True, download_name='survey_reports.zip')
    
    except Exception as e:
        print("Error in generate_report:", str(e))
        return jsonify({"error": str(e)}), 500