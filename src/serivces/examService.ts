// src/services/examService.ts
import { api } from './api';
import type {
  TestSummaryResponse,
  TestDetailResponse,
  TestWithQuestionsResponse,
  StartExamRequest,
  StopExamRequest,
  AutosaveRequest,
  SubmitExamRequest,
  SubmitExamResponse,
} from '@/types/exam';

const TEST_PREFIX = '/tests';
const RESP_PREFIX = '/responses';

export async function getTests(): Promise<TestSummaryResponse[]> {
  const res = await api.get<TestSummaryResponse[]>(TEST_PREFIX);
  return res.data;
}

export async function getTestDetail(testId: string): Promise<TestDetailResponse> {
  const res = await api.get<TestDetailResponse>(`${TEST_PREFIX}/${testId}`);
  return res.data;
}

export async function getTestForStudent(testId: string, code: string): Promise<TestWithQuestionsResponse> {
  const res = await api.get<TestWithQuestionsResponse>(`${TEST_PREFIX}/${testId}/by-code`, {
    params: { code },
  });
  return res.data;
}

export async function startExam(req: StartExamRequest): Promise<TestWithQuestionsResponse> {
  const res = await api.post<TestWithQuestionsResponse>(`${TEST_PREFIX}/start`, req);
  return res.data;
}

export async function stopExam(req: StopExamRequest): Promise<void> {
  await api.post(`${TEST_PREFIX}/stop`, req);
}

export async function autosaveResponses(req: AutosaveRequest): Promise<void> {
  await api.post(`${RESP_PREFIX}/autosave`, req);
}

export async function submitExam(req: SubmitExamRequest): Promise<SubmitExamResponse> {
  const res = await api.post<SubmitExamResponse>(`${RESP_PREFIX}/submit`, req);
  return res.data;
}
