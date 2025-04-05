import React, { useState } from 'react';
import SurveyQuestion from '../components/SurveyQuestion';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import '../styles/survey.css';

const surveyQuestions = [
    {
        question: "Before this installation, how often did you visit this site?",
        options: ["Daily", "A few times a week", "Once a week", "A few times a month", "Rarely/Never"],
        multiple: false,
    },
    {
        question: "Since the installation, how often do you visit this site?",
        options: ["Daily", "A few times a week", "Once a week", "A few times a month", "Rarely/Never"],
        multiple: false,
    },
    {
        question: "On average, how much time do you spend at this site per visit?",
        options: ["Less than 5 minutes", "5-15 minutes", "15-30 minutes", "30 minutes to 1 hour", "More than 1 hour"],
        multiple: false,
    },
    {
      question: "What is your age group?",
      options: ["Under 18", "18-24", "25-34", "35-44", "45-54", "45-54", "55-64", "65+"],
      multiple: false,
    },
    {
      question: "What is your gender?",
      options: ["Male", "Female", "Non-binary", "Prefer not to say"],
      multiple: false,
    },
    {
      question: "What is your race/ethnicity?",
      options: ["Black or African American", "Hispanic or Latino/a/x", "White", "Asian", "Native American or Alaska Native", "Native Hawaiian or Other Pacific Islander", "Middle Eastern or North African", "Multiracial", "Prefer not to say", "Other"],
      multiple: true,
    },
    {
      question: "What is your zip code?",
      options: ["10032", "10033", "10040", "Other"],
      multiple: false,
    },
    {
      question: "How welcome do you feel on this site? (1 = Not Welcome, 5 = Very Welcome)?",
      type: "range",
      options: [1, 2, 3, 4, 5], 
      multiple: false
    },
    {
      question: "How safe do you feel on this site? (1 = Not Safe, 5 = Very Safe)",
      type: "range",
      options: [1, 2, 3, 4, 5], 
      multiple: false
    },
    {
      question: "How comfortable do you feel on this site? (1 = Not Comfortable, 5 = Very Comfortable)",
      type: "range",
      options: [1, 2, 3, 4, 5], 
      multiple: false
    },
    {
      question: "How positive is your overall experience at this site? (1 = Very Negative, 5 = Very Positive.)",
      type: "range",
      options: [1, 2, 3, 4, 5], 
      multiple: false
    },
    {
      question: "What activity best describes your time spent at this site?",
      options: ["Read materials on-site", "Played or engaged with the installation", "Took a phone call", "Ate or drank", "Socialized with others", " Passed through without stopping", "Other"],
      multiple: true,
    },
    {
      question: "Has this installation made you more interested in exploring the surrounding neighborhood?",
      options: ["Yes", "No", "Not Sure"],
      multiple: false,
    }
];

export default function SurveyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(surveyQuestions.length).fill(null));
  const navigate = useNavigate();

  const current = surveyQuestions[currentIndex];

  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[currentIndex] = answer;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < surveyQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log('Survey completed', answers);
      navigate('/survey-complete')
    }    
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <>
    <Logo/>
    <div className="survey-page">
    <h2> Installation Title</h2>
    <img src='/placeholder-img.jpg' alt="Installation 1" className='survey-img'/>
      <div className="progress-container">
        <div className="progress-text">
          Question {currentIndex + 1} of {surveyQuestions.length}
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${((currentIndex + 1) / surveyQuestions.length) * 100}%`
            }}
          />
        </div>
      </div>

        <SurveyQuestion
          question={current.question}
          options={current.options}
          multiple={current.multiple}
          questionType={current.type || "choice"} // default fallback
          currentAnswer={answers[currentIndex] || []}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={currentIndex === 0}
      />

    </div>
    </>

  );
}
