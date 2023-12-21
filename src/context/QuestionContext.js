import React, { createContext, useState } from 'react';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questionData, setQuestionData] = useState([]);

  return (
    <QuestionContext.Provider value={[questionData, setQuestionData]}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContext;

