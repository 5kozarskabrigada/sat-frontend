// src/services/timerService.ts
import * as signalR from '@microsoft/signalr';
const hubUrl = import.meta.env.VITE_SIGNALR_HUB || '/hubs/examhub';
let connection = null;
export async function connectExamHub(testId, onTimerUpdate) {
    if (connection)
        return;
    connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();
    connection.on('timerUpdated', (payload) => {
        onTimerUpdate(payload.remainingSeconds);
    });
    await connection.start();
    await connection.invoke('JoinTestGroup', testId);
}
export async function disconnectExamHub(testId) {
    if (!connection)
        return;
    await connection.invoke('LeaveTestGroup', testId);
    await connection.stop();
    connection = null;
}
