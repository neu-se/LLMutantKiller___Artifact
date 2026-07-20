import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const promise = Q.reject('Test rejection');
        Q.resetUnhandledRejections();
        const unhandledRejectionsBefore = Q.getUnhandledReasons();
        expect(unhandledRejectionsBefore.length).toBe(1);
        promise.catch(() => {});
        const unhandledRejectionsAfter = Q.getUnhandledReasons();
        expect(unhandledRejectionsAfter.length).toBe(0);
    });
});