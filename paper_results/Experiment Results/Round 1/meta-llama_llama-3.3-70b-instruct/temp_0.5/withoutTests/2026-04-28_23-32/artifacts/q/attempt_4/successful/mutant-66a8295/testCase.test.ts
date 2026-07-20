import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test rejection');
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(0);
        Q.stopUnhandledRejectionTracking();
        promise.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);
        Q.stopUnhandledRejectionTracking();
        const promise2 = Q.reject('Test rejection 2');
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});