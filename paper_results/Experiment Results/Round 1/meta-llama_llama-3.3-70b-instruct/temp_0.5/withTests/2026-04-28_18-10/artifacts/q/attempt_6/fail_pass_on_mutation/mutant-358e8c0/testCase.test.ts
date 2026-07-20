import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise', () => {
        const promise = q(true);
        expect(promise.isFulfilled()).toBe(true);
    });
});