import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        Q.resetUnhandledRejections();
        const promise1 = Q.reject('Test rejection 1');
        const promise2 = Q.reject('Test rejection 2');
        const unhandledRejectionsBefore = Q.getUnhandledReasons();
        expect(unhandledRejectionsBefore.length).toBe(2);
        promise1.catch(() => {});
        const unhandledRejectionsAfter = Q.getUnhandledReasons();
        expect(unhandledRejectionsAfter.length).toBe(1);
    });
});