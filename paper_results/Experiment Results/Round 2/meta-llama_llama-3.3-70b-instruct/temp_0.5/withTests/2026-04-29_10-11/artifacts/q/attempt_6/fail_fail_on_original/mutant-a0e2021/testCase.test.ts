describe('Q function', () => {
    it('should set Q.longStackSupport to true when Q_DEBUG is set in process.env', () => {
        process.env.Q_DEBUG = 'true';
        const Q = require('../../../../../../../../../../subject_repositories/q/q').Q;
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});