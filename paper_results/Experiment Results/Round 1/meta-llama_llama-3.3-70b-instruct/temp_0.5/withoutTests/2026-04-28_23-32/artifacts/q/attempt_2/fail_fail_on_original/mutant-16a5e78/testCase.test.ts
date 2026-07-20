import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.isFulfilled', () => {
    it('should return true for a non-promise value and false for a rejected promise', () => {
        expect(Q.isFulfilled(1)).toBe(true);
        const promise = Q.reject(1);
        expect(Q.isFulfilled(promise)).toBe(false);
        expect(Q.isFulfilled(Q.resolve(1))).toBe(true);
    });
});