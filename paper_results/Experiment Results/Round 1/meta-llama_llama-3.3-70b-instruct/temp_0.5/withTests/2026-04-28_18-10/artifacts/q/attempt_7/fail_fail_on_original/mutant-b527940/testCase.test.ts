import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        Q.resetUnhandledRejections();
        const promise1 = Q.reject('Test rejection 1');
        promise1.catch(() => {});
        const promise2 = Q.reject('Test rejection 2');
        const unhandledRejections = Q.getUnhandledReasons();
        expect(unhandledRejections.length).toBe(1);
    });
});