describe('Q', () => {
    it('should not have longStackSupport enabled by default and should not be always true', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        const QWithEnv = require('../../../../../../../../subject_repositories/q/q.js');
        expect(QWithEnv.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
        const QWithoutEnvAgain = require('../../../../../../../../subject_repositories/q/q.js');
        expect(QWithoutEnvAgain.longStackSupport).toBe(false);
    });
});