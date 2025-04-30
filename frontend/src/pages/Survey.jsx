import React, { useState } from 'react';
import SurveyQuestion from '../components/SurveyQuestion';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import '../styles/survey.css';
import API from '../utils/apiClient';
import surveyQuestions from '../data/surveyQuestions';

export default function SurveyPage() {
  const [installationId] = useState('1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const current = surveyQuestions[currentIndex];
  const questionKey = current.questionId;

  const handleAnswerChange = (key, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: answer,
    }));
  };

  const handleNext = () => {
    if (!answers[questionKey] || answers[questionKey].length === 0) {
      setError("Please answer the question before proceeding.");
      return;
    }
    setError('');
    if (currentIndex < surveyQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate('/survey-complete');
    }
  };

  const handleBack = () => {
    setError('');
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/submit-survey', {
        installationId,
        responses: answers,
      });
      console.log('Survey is submitted', res.data);
      navigate('/survey-complete');
    } catch (err) {
      setError(err.response?.data?.message || 'Survey submission failed.');
      console.error('Submission failure:', err);
    }
  };

  return (
    <>
      <Logo />
      <div className="survey-page">
        <h2>Installation Title</h2>
        <img src="/placeholder-img.jpg" alt="Installation 1" className="survey-img" />

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
          questionType={current.type || "choice"}
          currentAnswer={answers[questionKey] || []}
          onAnswer={(answer) => handleAnswerChange(questionKey, answer)}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={currentIndex === 0}
          isLast={currentIndex === surveyQuestions.length - 1}
          handleSubmit={handleSubmit}
        />

        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
}

