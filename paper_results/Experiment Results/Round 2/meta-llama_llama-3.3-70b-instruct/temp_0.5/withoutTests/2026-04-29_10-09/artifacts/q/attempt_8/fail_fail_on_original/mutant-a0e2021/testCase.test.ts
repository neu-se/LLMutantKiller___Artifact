describe('Q Promise Library', () => {
  it('should set longStackSupport to true when Q_DEBUG is set and process is an object', () => {
    const Q = require('../../../../../../../../subject_repositories/q/q.js');
    delete process.env.Q_DEBUG;
    Q.longStackSupport = false;
    process.env.Q_DEBUG = 'true';
    if (typeof process === 'object' && process.env && process.env.Q_DEBUG) {
      expect(Q.longStackSupport).toBe(true);
    } else {
      expect(Q.longStackSupport).toBe(false);
    }
  });
});