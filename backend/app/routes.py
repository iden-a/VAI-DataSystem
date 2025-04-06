# Define all your Flask routes (API endpoints)
from flask import Blueprint, request, jsonify, current_app
from app.models import UserSignUp, SurveyResponse
from firebase_admin import auth

main = Blueprint('main', __name__)

@main.route('/')
def health_check():
    return jsonify({"message": "Hello, VAI project!"})

@main.route('/submit-survey', methods=['POST'])
def submit_survey():
    response_data = request.json
    installation_id = response_data.get('installationId')
    responses = response_data.get('responses')

    survey_response = SurveyResponse(responses, installation_id)
    
    try:
        current_app.db.collection('surveyResponses').add(survey_response.to_dict())
        return jsonify({"message": "Survey submitted"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400



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


