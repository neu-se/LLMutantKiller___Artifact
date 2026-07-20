describe('Q', () => {
    it('should track unhandled rejections', () => {
        const Q = require('./q');
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test rejection');
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});