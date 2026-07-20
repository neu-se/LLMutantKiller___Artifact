import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.isFulfilled', () => {
    it('should return true for a fulfilled promise', () => {
        const promise = Q.resolve(1);
        expect(Q.isFulfilled(promise)).toBe(true);
    });

    it('should return true for a non-promise value', () => {
        expect(Q.isFulfilled(1)).toBe(true);
    });

    it('should return false for a rejected promise', () => {
        const promise = Q.reject(1);
        expect(Q.isFulfilled(promise)).toBe(false);
    });
});