// src/types/exam.ts

export type QuestionType = 'MULTIPLE_CHOICE' | 'GRID_IN';

export interface QuestionOptionResponse {
  label: string;        // e.g. "A", "B", "C", "D"
  value: string;        // internal value
}

export interface QuestionResponse {
  id: string;
  testId: string;
  sectionIndex: number;
  questionNumber: number;
  questionText: string;
  passageText?: string | null;
  questionType: QuestionType;
  options?: QuestionOptionResponse[]; // null/undefined for grid-in, etc.
}



export interface TestSectionInfo {
  index: number;
  name: string;
  durationSeconds: number;
  sectionType: string; // or specific union if you want
}

export interface TestWithQuestionsResponse {
  testId: string;
  title: string;
  sections: TestSectionInfo[];
  questions: QuestionResponse[];
}

export interface AutosaveAnswerItem {
  questionId: string;
  selectedAnswer: string | null;
  isFlagged: boolean;
}

export interface AutosaveRequest {
  testId: string;
  // backend expects Guid; string here
  answers: AutosaveAnswerItem[];
}

export interface SubmitAnswerItem {
  questionId: string;
  selectedAnswer: string | null;
  isFlagged: boolean;
}

export interface SubmitExamRequest {
  testId: string;
  answers: SubmitAnswerItem[];
}

export interface SubmitExamResponse {
  resultId: string;
  totalCorrect: number;
  totalIncorrect: number;
  rawScore: number;
  percentage: number;
}



// Summaries for admin / listing
// src/types/exam.ts

export interface TestSummaryResponse {
  id: string;
  title: string;
  isActive: boolean;
  createdAt: string;
  questionCount: number;
}


// Detailed test info (no questions, just config/sections)
export interface TestDetailResponse {
  testId: string;
  title: string;
  description?: string | null;
  sections: TestSectionInfo[];
  isActive: boolean;
}

// Requests for starting/stopping exam if backend supports them
export interface StartExamRequest {
  testId: string;
  accessCode: string;
}

export interface StopExamRequest {
  testId: string;
}
