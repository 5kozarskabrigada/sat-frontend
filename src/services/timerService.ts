// src/services/timerService.ts
import * as signalR from '@microsoft/signalr';

const hubUrl = import.meta.env.VITE_SIGNALR_HUB || '/hubs/examhub';

let connection: signalR.HubConnection | null = null;

export async function connectExamHub(testId: string, onTimerUpdate: (seconds: number) => void) {
  if (connection) return;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl)
    .withAutomaticReconnect()
    .build();

  connection.on('timerUpdated', (payload: { testId: string; remainingSeconds: number }) => {
    onTimerUpdate(payload.remainingSeconds);
  });

  await connection.start();
  await connection.invoke('JoinTestGroup', testId);
}

export async function disconnectExamHub(testId: string) {
  if (!connection) return;
  await connection.invoke('LeaveTestGroup', testId);
  await connection.stop();
  connection = null;
}
