describe('Q', () => {
    it('should track unhandled rejections', () => {
        const Q = require('../../../../../../../../../../subject_repositories/q/q');
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        const promise = Q.reject('Test rejection');
        Q.done(promise, null, null, null);
        expect(Q.getUnhandledReasons()).toHaveLength(1);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toHaveLength(0);
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        const anotherPromise = Q.reject('Another Test rejection');
        Q.done(anotherPromise, null, null, null);
        expect(Q.getUnhandledReasons()).toHaveLength(1);
    });
});