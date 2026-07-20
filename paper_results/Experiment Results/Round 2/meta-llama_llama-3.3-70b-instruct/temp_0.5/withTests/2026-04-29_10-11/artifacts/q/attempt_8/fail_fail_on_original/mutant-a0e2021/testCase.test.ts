describe('Q function', () => {
    it('should set Q.longStackSupport to true when process.env.Q_DEBUG is set and process is an object', () => {
        process.env.Q_DEBUG = 'true';
        const q = require('../../../../../../../../../../subject_repositories/q/q').Q;
        expect(typeof process).toBe('object');
        expect(q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });

    it('should not set Q.longStackSupport to true when process.env.Q_DEBUG is set and process is not an object', () => {
        process.env.Q_DEBUG = 'true';
        const originalProcess = process;
        process = null;
        const q = require('../../../../../../../../../../subject_repositories/q/q').Q;
        expect(q.longStackSupport).toBe(false);
        process = originalProcess;
        delete process.env.Q_DEBUG;
    });
});