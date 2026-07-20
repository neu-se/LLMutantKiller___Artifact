import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise Library', () => {
  it('should not set longStackSupport to true when Q_DEBUG is set but process is not an object', () => {
    delete process.env.Q_DEBUG;
    Q.longStackSupport = false;
    process.env.Q_DEBUG = 'true';
    const originalProcess = global.process;
    global.process = null;
    expect(Q.longStackSupport).toBe(false);
    global.process = originalProcess;
  });
});