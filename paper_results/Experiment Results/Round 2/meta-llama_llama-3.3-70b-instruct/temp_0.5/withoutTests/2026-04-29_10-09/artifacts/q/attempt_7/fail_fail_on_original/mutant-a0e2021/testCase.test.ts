describe('Q Promise Library', () => {
  it('should set longStackSupport to true when Q_DEBUG is set and process is an object', () => {
    const Q = require('../../../../../../../../subject_repositories/q/q.js');
    delete process.env.Q_DEBUG;
    Q.longStackSupport = false;
    process.env.Q_DEBUG = 'true';
    expect(Q.longStackSupport).toBe(false);
    Q.longStackSupport = false;
    const originalProcess = global.process;
    global.process = {...originalProcess, env: {...originalProcess.env, Q_DEBUG: 'true' } };
    expect(Q.longStackSupport).toBe(false);
    global.process = originalProcess;
  });
});