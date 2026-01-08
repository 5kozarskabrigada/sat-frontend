import { jsx as _jsx } from "react/jsx-runtime";
// src/pages/ExamInterface.tsx
import { useCallback, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useExam } from '@/hooks/useExam';
import { useTimer } from '@/hooks/useTimer';
import { useLockdown } from '@/hooks/useLockdown';
import SatQuestionLayout from '@/components/Exam/SatQuestionLayout';
import { requireFullscreen } from '@/utils/securityUtils';
const ExamInterface = () => {
    const { testId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get('code') || '';
    const { loading, test, sections, currentSectionIndex, currentQuestionIndex, currentQuestion, currentSectionQuestions, answers, flags, selectQuestion, answerQuestion, toggleFlag, gotoNextQuestion, gotoPrevQuestion, autosave, submit, submitting, } = useExam({ testId: testId, accessCode: code });
    const totalSectionSeconds = sections[currentSectionIndex]?.durationSeconds ?? 0;
    const handleExpire = useCallback(async () => {
        const result = await submit();
        navigate(`/results/${result.resultId}`);
    }, [submit, navigate]);
    const { minutes, seconds } = useTimer({
        initialSeconds: totalSectionSeconds,
        onExpire: handleExpire,
    });
    const { isWindowFocused, isDocumentVisible, isFullscreen } = useLockdown({
        onViolation: () => {
            // later: send anti-cheat event to backend
        },
    });
    useEffect(() => {
        // prompt fullscreen once when exam loads
        void requireFullscreen().catch(() => {
            // user denied; you can show a warning
        });
    }, []);
    if (loading || !test || !currentQuestion) {
        return (_jsx("div", { className: "sat-loading-screen", children: "Loading your SAT exam\u2026" }));
    }
    return (_jsx(SatQuestionLayout, { testTitle: test.title, sections: sections, currentSectionIndex: currentSectionIndex, currentQuestion: currentQuestion, currentQuestionIndex: currentQuestionIndex, currentSectionQuestions: currentSectionQuestions, answers: answers, flags: flags, timer: { minutes, seconds }, onSelectQuestion: selectQuestion, onAnswer: answerQuestion, onToggleFlag: toggleFlag, onNext: gotoNextQuestion, onPrev: gotoPrevQuestion, onAutosave: autosave, onSubmit: async () => {
            const result = await submit();
            navigate(`/results/${result.resultId}`);
        }, submitting: submitting, status: {
            isWindowFocused,
            isDocumentVisible,
            isFullscreen,
        } }));
};
export default ExamInterface;
