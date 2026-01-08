import { jsx as _jsx } from "react/jsx-runtime";
// src/context/ExamContext.tsx
import { createContext, useContext } from 'react';
import { useExam } from '@/hooks/useExam';
const ExamContext = createContext(undefined);
export const ExamProvider = ({ testId, accessCode, children }) => {
    const { loading, test, sections, currentSectionIndex, currentQuestionIndex, currentQuestion, answers, flags, selectQuestion, answerQuestion, toggleFlag, gotoNextQuestion, gotoPrevQuestion, currentSectionQuestions: _currentSectionQuestions, } = useExam({ testId, accessCode });
    const value = {
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
    return _jsx(ExamContext.Provider, { value: value, children: children });
};
export function useExamContext() {
    const ctx = useContext(ExamContext);
    if (!ctx)
        throw new Error('useExamContext must be used within ExamProvider');
    return ctx;
}
