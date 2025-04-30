const surveyQuestions = [
    {
      questionId: "q1",
      question: "Before this installation, how often did you visit this site?",
      options: ["Daily", "A few times a week", "Once a week", "A few times a month", "Rarely/Never"],
      multiple: false,
    },
    {
      questionId: "q2",
      question: "Since the installation, how often do you visit this site?",
      options: ["Daily", "A few times a week", "Once a week", "A few times a month", "Rarely/Never"],
      multiple: false,
    },
    {
      questionId: "q3",
      question: "On average, how much time do you spend at this site per visit?",
      options: ["Less than 5 minutes", "5-15 minutes", "15-30 minutes", "30 minutes to 1 hour", "More than 1 hour"],
      multiple: false,
    },
    {
      questionId: "q4",
      question: "What is your age group?",
      options: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      multiple: false,
    },
    {
      questionId: "q5",
      question: "What is your gender?",
      options: ["Male", "Female", "Non-binary", "Prefer not to say"],
      multiple: false,
    },
    {
      questionId: "q6",
      question: "What is your race/ethnicity?",
      options: [
        "Black or African American", "Hispanic or Latino/a/x", "White", "Asian",
        "Native American or Alaska Native", "Native Hawaiian or Other Pacific Islander",
        "Middle Eastern or North African", "Multiracial", "Prefer not to say", "Other"
      ],
      multiple: true,
    },
    {
      questionId: "q7",
      question: "What is your zip code?",
      options: ["10032", "10033", "10040", "Other"],
      multiple: false,
    },
    {
      questionId: "q8",
      question: "How welcome do you feel on this site? (1 = Not Welcome, 5 = Very Welcome)?",
      type: "range",
      options: [1, 2, 3, 4, 5],
      multiple: false,
    },
    {
      questionId: "q9",
      question: "How safe do you feel on this site? (1 = Not Safe, 5 = Very Safe)",
      type: "range",
      options: [1, 2, 3, 4, 5],
      multiple: false,
    },
    {
      questionId: "q10",
      question: "How comfortable do you feel on this site? (1 = Not Comfortable, 5 = Very Comfortable)",
      type: "range",
      options: [1, 2, 3, 4, 5],
      multiple: false,
    },
    {
      questionId: "q11",
      question: "How positive is your overall experience at this site? (1 = Very Negative, 5 = Very Positive.)",
      type: "range",
      options: [1, 2, 3, 4, 5],
      multiple: false,
    },
    {
      questionId: "q12",
      question: "What activity best describes your time spent at this site?",
      options: [
        "Read materials on-site", "Played or engaged with the installation", "Took a phone call",
        "Ate or drank", "Socialized with others", "Passed through without stopping", "Other"
      ],
      multiple: true,
    },
    {
      questionId: "q13",
      question: "Has this installation made you more interested in exploring the surrounding neighborhood?",
      options: ["Yes", "No", "Not Sure"],
      multiple: false,
    }
  ];
  
  export default surveyQuestions;
  
