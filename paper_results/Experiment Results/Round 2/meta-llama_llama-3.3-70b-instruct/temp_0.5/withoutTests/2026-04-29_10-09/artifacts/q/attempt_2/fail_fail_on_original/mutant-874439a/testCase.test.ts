import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify a rejected promise', () => {
        const fulfilledPromise = Q(1);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
    });
});