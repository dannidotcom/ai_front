import React, { createContext, useState, ReactNode } from 'react';

export type Question = {
  id: string;
  text: string;
  category: 'technical' | 'hr' | 'behavioral';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

export type Answer = {
  questionId: string;
  text: string;
  score: number;
  feedback: string;
};

export type EvaluationResult = {
  technicalScore: number;
  hrScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: 'retenu' | 'ajourné' | 'refusé';
  feedback: string;
};

type InterviewContextType = {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  isInterviewComplete: boolean;
  evaluation: EvaluationResult | null;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: Answer) => void;
  setIsInterviewComplete: (isComplete: boolean) => void;
  setEvaluation: (evaluation: EvaluationResult) => void;
  resetInterview: () => void;
};

export const InterviewContext = createContext<InterviewContextType>({
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  isInterviewComplete: false,
  evaluation: null,
  setQuestions: () => {},
  setCurrentQuestionIndex: () => {},
  addAnswer: () => {},
  setIsInterviewComplete: () => {},
  setEvaluation: () => {},
  resetInterview: () => {}
});

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const addAnswer = (answer: Answer) => {
    setAnswers(prev => [...prev, answer]);
  };

  const resetInterview = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsInterviewComplete(false);
    setEvaluation(null);
  };

  return (
    <InterviewContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        answers,
        isInterviewComplete,
        evaluation,
        setQuestions,
        setCurrentQuestionIndex,
        addAnswer,
        setIsInterviewComplete,
        setEvaluation,
        resetInterview
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};