# Test utility functions

import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from flask import current_app


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

class SurveyAnalyzer:
    def __init__(self, responses, question_map):
        self.responses = responses  # list of dictionaries
        self.question_map = question_map
        self.df = pd.DataFrame(responses)
        if 'timestamp' in self.df.columns:
            self.df['timestamp'] = pd.to_datetime(self.df['timestamp'])

    def get_response_count(self):
        """returns the number of total survey responses"""
        return len(self.df)

    def summarize_multiple_choice(self, question_id):
        """returns summary for multiple choice questions"""
        if question_id not in self.df.columns:
            return None

        counts = self.df[question_id].value_counts(dropna=True)
        percentages = (counts / len(self.df)) * 100
        summary = pd.DataFrame({
            'Answer': counts.index,
            'Count': counts.values,
            'Percentage': percentages.values.round(2)
        })
        return summary

    def summarize_numeric_question(self, question_id):
        """summarizing numeric questions"""
        if question_id not in self.df.columns:
            return None
        return {
            'Average': self.df[question_id].mean(),
            'Minimum': self.df[question_id].min(),
            'Maximum': self.df[question_id].max(),
            'Confidence Interval (95%)': self.calculate_confidence_interval(self.df[question_id])
        }

    def calculate_confidence_interval(self, data_series):
        """calculates 95% confidence interval"""
        data = data_series.dropna()
        n = len(data)
        if n == 0:
            return (None, None)
        mean = np.mean(data)
        std_error = np.std(data, ddof=1) / np.sqrt(n)
        margin = 1.96 * std_error  # for 95% confidence
        return (round(mean - margin, 2), round(mean + margin, 2))

    def export_summary_csv(self, filepath):
        """exports the summarized survey results as csv file"""
        with open(filepath, 'w') as f:
            f.write(f"Total Responses,{self.get_response_count()}\n\n")
            for qid, question_text in self.question_map.items():
                f.write(f"Question:,{question_text}\n")
                if qid in ['q8', 'q9', 'q10', 'q11']:  # these are the scale questions
                    stats = self.summarize_numeric_question(qid)
                    if stats:
                        for key, value in stats.items():
                            f.write(f"{key},{value}\n")
                else:
                    summary = self.summarize_multiple_choice(qid)
                    if summary is not None:
                        summary.to_csv(f, index=False)
                f.write("\n")

    def export_summary_excel(self, filepath):
        """exports summarized survey results as excel file"""
        with pd.ExcelWriter(filepath) as writer:
            for qid, question_text in self.question_map.items():
                if qid in ['q8', 'q9', 'q10', 'q11']:  # these are the scale question
                    stats = self.summarize_numeric_question(qid)
                    if stats:
                        df_stats = pd.DataFrame(list(stats.items()), columns=['Metric', 'Value'])
                        df_stats.to_excel(writer, sheet_name=qid[:30], index=False)
                else:
                    summary = self.summarize_multiple_choice(qid)
                    if summary is not None:
                        summary.to_excel(writer, sheet_name=qid[:30], index=False)

    def generate_graphs(self, output_dir):
        """outputs bar charts for each question"""
        os.makedirs(output_dir, exist_ok=True)

        for qid, question_text in self.question_map.items():
            if qid not in self.df.columns:
                continue
            summary = self.summarize_multiple_choice(qid)
            if summary is None:
                continue

            plt.figure(figsize=(8, 6))
            if qid in ['q4', 'q5', 'q6', 'q7']:  # these are the demographic questions
                plt.pie(summary['Count'], labels=summary['Answer'], autopct='%1.1f%%', startangle=140)
                plt.title(f"{question_text}")
                plt.axis('equal')
            else:
                plt.bar(summary['Answer'], summary['Count'])
                plt.title(f"{question_text}")
                plt.xticks(rotation=45, ha='right')
                plt.tight_layout()

            plt.savefig(os.path.join(output_dir, f"{qid}.png"))
            plt.close()

    def summarize_timestamp_location(self):
        """analyzes submission timestamps """
        summary = {}
        if 'timestamp' in self.df.columns:
            summary['first_submission'] = self.df['timestamp'].min()
            summary['last_submission'] = self.df['timestamp'].max()
        if 'location' in self.df.columns:
            location_counts = self.df['location'].value_counts()
            summary['top_locations'] = location_counts.to_dict()
        return summary

def save_graphs_to_pdf(input_folder, output_pdf_path, question_map):
    pdf = PdfPages(output_pdf_path)

    # sorting all .png files alphabetically
    image_files = sorted([f for f in os.listdir(input_folder) if f.endswith('.png')])

    for image_file in image_files:
        qid = image_file.replace('.png', '')  # extracting qid from filename

        img_path = os.path.join(input_folder, image_file)
        img = plt.imread(img_path)

        # creating a new figure for each image
        fig, ax = plt.subplots(figsize=(8, 6))
        ax.imshow(img)
        ax.axis('off')  # hide axes

        # adding question as title
        title = question_map.get(qid, qid)  # handling title error
        plt.title(title, fontsize=12, pad=20)

        pdf.savefig(fig, bbox_inches='tight')
        plt.close(fig)

    pdf.close()
    print(f"PDF saved successfully at {output_pdf_path}")

def load_responses_from_firestore():
    db = current_app.db  # using the Firestore database from the Flask app
    responses_ref = db.collection('surveyResponses')
    docs = responses_ref.stream()

    responses = []
    for doc in docs:
        response = doc.to_dict()
        response['id'] = doc.id  
        responses.append(response)
    
    return responses
