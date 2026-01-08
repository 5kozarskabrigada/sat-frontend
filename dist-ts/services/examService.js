// src/services/examService.ts
import { api } from './api';
const TEST_PREFIX = '/tests';
const RESP_PREFIX = '/responses';
export async function getTests() {
    const res = await api.get(TEST_PREFIX);
    return res.data;
}
export async function getTestDetail(testId) {
    const res = await api.get(`${TEST_PREFIX}/${testId}`);
    return res.data;
}
export async function getTestForStudent(testId, code) {
    const res = await api.get(`${TEST_PREFIX}/${testId}/by-code`, {
        params: { code },
    });
    return res.data;
}
export async function startExam(req) {
    const res = await api.post(`${TEST_PREFIX}/start`, req);
    return res.data;
}
export async function stopExam(req) {
    await api.post(`${TEST_PREFIX}/stop`, req);
}
export async function autosaveResponses(req) {
    await api.post(`${RESP_PREFIX}/autosave`, req);
}
export async function submitExam(req) {
    const res = await api.post(`${RESP_PREFIX}/submit`, req);
    return res.data;
}
