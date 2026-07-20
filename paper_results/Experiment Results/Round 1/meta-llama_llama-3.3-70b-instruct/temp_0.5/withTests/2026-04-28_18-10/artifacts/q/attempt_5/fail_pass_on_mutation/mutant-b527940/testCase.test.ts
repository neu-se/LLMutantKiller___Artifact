import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        Q.resetUnhandledRejections();
        const promise = Q.reject('Test rejection');
        const unhandledRejectionsBefore = Q.getUnhandledReasons();
        expect(unhandledRejectionsBefore.length).toBe(1);
        promise.catch(() => {
            Q.nextTick(() => {
                const unhandledRejectionsAfter = Q.getUnhandledReasons();
                expect(unhandledRejectionsAfter.length).toBe(0);
            });
        });
    });
});