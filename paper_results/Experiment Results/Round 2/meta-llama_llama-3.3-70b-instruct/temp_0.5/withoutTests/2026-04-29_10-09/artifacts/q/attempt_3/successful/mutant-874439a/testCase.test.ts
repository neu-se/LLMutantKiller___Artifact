import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify a rejected promise', () => {
        const rejectedPromise = Q.reject('Test rejection reason');
        const fulfilledPromise = Q(1);
        expect(Q.isRejected(rejectedPromise)).toBe(true);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
    });
});