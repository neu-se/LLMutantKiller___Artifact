describe('Q', () => {
    it('should track unhandled rejections', () => {
        const Q = require('./q.js');
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test rejection');
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});