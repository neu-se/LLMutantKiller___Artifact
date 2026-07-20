describe('Q Promise Library', () => {
  it('should not set longStackSupport to true when Q_DEBUG is set but process is not an object', () => {
    const Q = require('./q.js');
    delete process.env.Q_DEBUG;
    Q.longStackSupport = false;
    process.env.Q_DEBUG = 'true';
    expect(Q.longStackSupport).toBe(false);
    const originalProcess = global.process;
    global.process = { ...originalProcess, env: { ...originalProcess.env } };
    expect(Q.longStackSupport).toBe(false);
    global.process = originalProcess;
  });
});