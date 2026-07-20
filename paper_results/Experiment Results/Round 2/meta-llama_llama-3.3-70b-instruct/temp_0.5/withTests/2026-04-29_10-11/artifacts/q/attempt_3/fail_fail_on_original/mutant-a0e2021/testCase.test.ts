describe('Q function', () => {
    it('should set Q.longStackSupport to true when process.env.Q_DEBUG is set and process is an object', () => {
        process.env.Q_DEBUG = 'true';
        const originalProcess = process;
        process = { env: process.env };
        const q = require('../../../../../../../../../../subject_repositories/q/q');
        expect(q.Q.longStackSupport).toBe(true);
        process = originalProcess;
        delete process.env.Q_DEBUG;
    });

    it('should not set Q.longStackSupport to true when process.env.Q_DEBUG is not set', () => {
        delete process.env.Q_DEBUG;
        const q = require('../../../../../../../../../../subject_repositories/q/q');
        expect(q.Q.longStackSupport).toBe(false);
    });

    it('should not set Q.longStackSupport to true when process is not an object', () => {
        process.env.Q_DEBUG = 'true';
        const originalProcess = process;
        process = null;
        const q = require('../../../../../../../../../../subject_repositories/q/q');
        expect(q.Q.longStackSupport).toBe(false);
        process = originalProcess;
        delete process.env.Q_DEBUG;
    });
});