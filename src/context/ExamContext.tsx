// src/context/ExamContext.tsx
import React, { createContext, useContext } from 'react';
import { useExam } from '../hooks/useExam';
import type { TestSectionInfo, QuestionResponse } from '../types/exam';

interface ExamContextValue {
  loading: boolean;
  testTitle: string;
  sections: TestSectionInfo[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  currentQuestion: QuestionResponse | null;
  answers: Record<string, string | null>;
  flags: Record<string, boolean>;
  // actions
  gotoNextQuestion: () => void;
  gotoPrevQuestion: () => void;
  selectQuestion: (sectionIndex: number, idx: number) => void;
  answerQuestion: (questionId: string, value: string | null) => void;
  toggleFlag: (questionId: string) => void;
}

const ExamContext = createContext<ExamContextValue | undefined>(undefined);

export const ExamProvider: React.FC<{
  testId: string;
  accessCode: string;
  children: React.ReactNode;
}> = ({ testId, accessCode, children }) => {
  const {
    loading,
    test,
    sections,
    currentSectionIndex,
    currentQuestionIndex,
    currentQuestion,
    currentSectionQuestions,
    answers,
    flags,
    selectQuestion,
    answerQuestion,
    toggleFlag,
    gotoNextQuestion,
    gotoPrevQuestion,
  } = useExam({ testId, accessCode });

  const value: ExamContextValue = {
    loading,
    testTitle: test?.title ?? '',
    sections,
    currentSectionIndex,
    currentQuestionIndex,
    currentQuestion,
    answers,
    flags,
    gotoNextQuestion,
    gotoPrevQuestion,
    selectQuestion,
    answerQuestion,
    toggleFlag,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

export function useExamContext() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error('useExamContext must be used within ExamProvider');
  return ctx;
}
