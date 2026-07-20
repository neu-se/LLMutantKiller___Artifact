import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise Library', () => {
  it('should only enable long stack support when Q_DEBUG is set and process is an object', () => {
    process.env.Q_DEBUG = 'true';
    const originalProcess = global.process;
    global.process = { ...originalProcess, env: { ...originalProcess.env } };
    expect(Q.longStackSupport).toBe(false);
    global.process = originalProcess;
  });
});