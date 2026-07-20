import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return true for isFulfilled when given a fulfilled promise', () => {
        const promise = Q(10);
        expect(Q.isFulfilled(promise)).toBe(true);
    });
});