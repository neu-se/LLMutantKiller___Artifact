import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when a promise is rejected in the mutated code', () => {
        const rejectPromise = Q.reject(new Error('Test error'));
        expect(() => rejectPromise.done()).not.toThrowError();
    });
});