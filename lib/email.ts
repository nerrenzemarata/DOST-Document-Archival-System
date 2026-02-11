import { fork, ChildProcess } from 'child_process';
import path from 'path';

let worker: ChildProcess | null = null;

function getWorker() {
  if (!worker || !worker.connected) {
    const script = path.join(process.cwd(), 'lib', 'send-email-worker.cjs');
    worker = fork(script, [], { stdio: ['pipe', 'inherit', 'inherit', 'ipc'] });
    worker.on('exit', () => { worker = null; });
  }
  return worker;
}

export function sendOtpEmail(to: string, otp: string) {
  const w = getWorker();
  w.send({
    to,
    otp,
    smtpEmail: process.env.SMTP_EMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
  });
}
