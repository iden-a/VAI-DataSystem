'''# Test Flask routes
# Define all your Flask routes (API endpoints)
from tests.test_utils import SurveyAnalyzer
from tests.test_utils import load_responses_from_firestore
from tests.test_utils import SurveyAnalyzer

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

responses = load_responses_from_firestore()

analyzer = SurveyAnalyzer(responses, question_map)
analyzer.get_response_count()
analyzer.summarize_multiple_choice("q1")
analyzer.summarize_numeric_question("q8")
analyzer.export_summary_csv('survey_summary.csv')
analyzer.export_summary_excel('survey_summary.xlsx')
analyzer.generate_graphs('survey_graphs')'''