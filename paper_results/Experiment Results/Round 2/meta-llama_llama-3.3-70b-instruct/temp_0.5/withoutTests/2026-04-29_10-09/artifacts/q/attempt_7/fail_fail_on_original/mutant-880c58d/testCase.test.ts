describe('Q', () => {
    it('should not have longStackSupport enabled by default and should be enabled when Q_DEBUG is set', () => {
        const Q = require('./q.js');
        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        const QWithEnv = require('./q.js');
        expect(QWithEnv.longStackSupport).toBe(true);
    });
});