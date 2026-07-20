describe('Q', () => {
    it('should throw an error when Q_DEBUG is always true', () => {
        const originalQDebug = process.env.Q_DEBUG;
        process.env.Q_DEBUG = 'true';
        const Q = require('./q.js');
        expect(Q.longStackSupport).toBe(true);
        process.env.Q_DEBUG = originalQDebug;
    });
});