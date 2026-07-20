import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.isRejected', () => {
    it('should return false for a fulfilled promise', () => {
        const fulfilledPromise = Q.resolve('value');
        expect(Q.isRejected(fulfilledPromise)).toBe(false);
    });
});