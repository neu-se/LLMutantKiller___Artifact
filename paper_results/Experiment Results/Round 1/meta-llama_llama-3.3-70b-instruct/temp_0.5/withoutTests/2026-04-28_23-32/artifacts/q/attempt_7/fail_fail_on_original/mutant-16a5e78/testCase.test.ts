import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.isFulfilled', () => {
    it('should return true for a fulfilled promise and false for a rejected promise', () => {
        const fulfilledPromise = Q.resolve(1);
        const rejectedPromise = Q.reject(1);
        expect(Q.isFulfilled(fulfilledPromise)).toBe(true);
        expect(Q.isFulfilled(rejectedPromise)).toBe(false);
        expect(Q.isFulfilled(Q(1))).toBe(true);
    });
});