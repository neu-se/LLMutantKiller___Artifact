import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.isFulfilled', () => {
    it('should return true for a non-promise value and a fulfilled promise', () => {
        expect(Q.isFulfilled(1)).toBe(true);
        expect(Q.isFulfilled(Q.resolve(1))).toBe(true);
        expect(Q.isFulfilled(Q.reject(1))).toBe(false);
    });
});