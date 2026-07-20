import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.isFulfilled', () => {
    it('should return true for a non-promise value and false for a rejected promise', () => {
        const promise = Q.resolve(1);
        const rejectedPromise = Q.reject(1);
        expect(Q.isFulfilled(promise)).toBe(true);
        expect(Q.isFulfilled(rejectedPromise)).toBe(false);
        expect(Q.isFulfilled(1)).toBe(true);
    });
});