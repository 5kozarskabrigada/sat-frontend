// src/hooks/useExam.ts
import { useEffect, useMemo, useState } from 'react';
import {
  TestWithQuestionsResponse,
  QuestionResponse,
  AutosaveAnswerItem,
  AutosaveRequest,
  SubmitExamRequest,
  SubmitExamResponse,
} from '@/types/exam';
import { getTestForStudent, autosaveResponses, submitExam } from '@/services/examService';

interface UseExamOptions {
  testId: string;
  accessCode: string;
}

export function useExam({ testId, accessCode }: UseExamOptions) {
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState<TestWithQuestionsResponse | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  // Load test + questions
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await getTestForStudent(testId, accessCode);
        if (cancelled) return;
        setTest(data);
        // init answers/flags
        const initAnswers: Record<string, string | null> = {};
        const initFlags: Record<string, boolean> = {};
        for (const q of data.questions) {
          initAnswers[q.id] = null;
          initFlags[q.id] = false;
        }
        setAnswers(initAnswers);
        setFlags(initFlags);
        setCurrentSectionIndex(0);
        setCurrentQuestionIndex(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [testId, accessCode]);

  const questionsBySection = useMemo(() => {
    if (!test) return [];
    const bySection: QuestionResponse[][] = [];
    for (const s of test.sections) {
      bySection[s.index] = [];
    }
    for (const q of test.questions) {
      if (!bySection[q.sectionIndex]) bySection[q.sectionIndex] = [];
      bySection[q.sectionIndex].push(q);
    }
    // sort each section by questionNumber
    for (const arr of bySection) {
      arr?.sort((a, b) => a.questionNumber - b.questionNumber);
    }
    return bySection;
  }, [test]);

  const currentSectionQuestions = useMemo(() => {
    if (!questionsBySection[currentSectionIndex]) return [];
    return questionsBySection[currentSectionIndex];
  }, [questionsBySection, currentSectionIndex]);

  const currentQuestion = currentSectionQuestions[currentQuestionIndex] ?? null;

  function selectQuestion(sectionIndex: number, indexInSection: number) {
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndex(indexInSection);
  }

  function answerQuestion(questionId: string, value: string | null) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function toggleFlag(questionId: string) {
    setFlags((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  }

  function gotoNextQuestion() {
    if (!currentSectionQuestions.length) return;
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      return;
    }
    // if last in section, go to first in next section if exists
    if (currentSectionIndex < (test?.sections.length ?? 0) - 1) {
      setCurrentSectionIndex((s) => s + 1);
      setCurrentQuestionIndex(0);
    }
  }

  function gotoPrevQuestion() {
    if (!currentSectionQuestions.length) return;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
      return;
    }
    // go to last of previous section if exists
    if (currentSectionIndex > 0) {
      const prevSectionIndex = currentSectionIndex - 1;
      const prevQuestions = questionsBySection[prevSectionIndex] || [];
      if (prevQuestions.length > 0) {
        setCurrentSectionIndex(prevSectionIndex);
        setCurrentQuestionIndex(prevQuestions.length - 1);
      }
    }
  }

  async function autosave() {
    if (!test) return;
    const payload: AutosaveRequest = {
      testId: test.testId,
      answers: Object.entries(answers).map<AutosaveAnswerItem>(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
        isFlagged: flags[questionId] ?? false,
      })),
    };
    await autosaveResponses(payload);
  }

  async function submit(): Promise<SubmitExamResponse> {
    if (!test) throw new Error('Test not loaded');
    setSubmitting(true);
    try {
      const payload: SubmitExamRequest = {
        testId: test.testId,
        answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
          isFlagged: flags[questionId] ?? false,
        })),
      };
      return await submitExam(payload);
    } finally {
      setSubmitting(false);
    }
  }

  return {
    loading,
    test,
    sections: test?.sections ?? [],
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
    autosave,
    submit,
    submitting,
  };
}
