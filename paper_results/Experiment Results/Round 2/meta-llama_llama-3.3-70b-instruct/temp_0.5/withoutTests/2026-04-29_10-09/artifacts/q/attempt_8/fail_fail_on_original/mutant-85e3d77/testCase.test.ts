describe('Q', () => {
    it('should track unhandled rejections', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test rejection');
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});