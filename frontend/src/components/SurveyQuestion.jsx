export default function SurveyQuestion({ 
    question, 
    options, 
    multiple, 
    currentAnswer, 
    questionType = "choice", // default
    onAnswer, 
    onNext, 
    onBack, 
    isFirst
}) {
    const handleChange = (e, option) => {
        if (questionType === "range") {
            onAnswer([e.target.value]);
        } else if (multiple) {
            const updated = currentAnswer.includes(option)
                ? currentAnswer.filter(item => item !== option)
                : [...currentAnswer, option];
            onAnswer(updated);
        } else {
            onAnswer([option]);
        }
    };

    const isNextDisabled = !currentAnswer || currentAnswer.length === 0;

    return (
        <div className="question-container">
            <h2>{question}</h2>
            <form>
                {questionType === "range" ? (
                    <div className="range-input-wrapper">
                        <input
                            type="range"
                            name="option"
                            min="1"
                            max="5"
                            step="1"
                            value={currentAnswer?.[0] || 3}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="range-labels">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                        </div>
                    </div>
                ) : (
                    options.map((option, index) => (
                        <label key={index} className="option-label">
                            <input
                                type={multiple ? "checkbox" : "radio"}
                                name="option"
                                value={option}
                                checked={currentAnswer?.includes(option) || false}
                                onChange={(e) => handleChange(e, option)}
                            />
                            {option}
                        </label>
                    ))
                )}
            </form>
            <div className="survey-navigation">
                {!isFirst && (
                    <button type="button" className="nav-button back-button" onClick={onBack}>
                        Back
                    </button>
                )}
                <button 
                    type="button" 
                    className="nav-button next-button" 
                    onClick={onNext} 
                    disabled={isNextDisabled}
                >
                    Next
                </button>
            </div>
        </div>
    );
}


