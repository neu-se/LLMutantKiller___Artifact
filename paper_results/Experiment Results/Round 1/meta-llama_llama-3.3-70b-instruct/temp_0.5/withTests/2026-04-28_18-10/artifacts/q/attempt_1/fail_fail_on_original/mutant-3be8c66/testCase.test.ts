import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return true for isFulfilled when given a fulfilled promise', () => {
        const promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
    });
});