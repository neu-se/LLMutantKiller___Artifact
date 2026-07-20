describe('Q', () => {
    it('should track unhandled rejections', () => {
        const q = require('../q');
        q.stopUnhandledRejectionTracking();
        q.resetUnhandledRejections();
        const promise = q.reject('Test rejection');
        q.done(promise, null, null, null);
        expect(q.getUnhandledReasons()).toHaveLength(1);
        q.resetUnhandledRejections();
        expect(q.getUnhandledReasons()).toHaveLength(0);
        q.stopUnhandledRejectionTracking();
        q.resetUnhandledRejections();
        const anotherPromise = q.reject('Another Test rejection');
        q.done(anotherPromise, null, null, null);
        expect(q.getUnhandledReasons()).toHaveLength(1);
    });
});