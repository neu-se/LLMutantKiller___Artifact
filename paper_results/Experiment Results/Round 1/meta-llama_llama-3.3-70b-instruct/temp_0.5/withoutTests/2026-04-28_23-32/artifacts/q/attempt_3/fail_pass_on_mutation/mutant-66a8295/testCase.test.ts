import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons().length).toBe(0);
        promise.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});