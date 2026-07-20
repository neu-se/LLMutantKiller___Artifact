import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise when called with a value', () => {
        // The function should return a promise
        const promise = Q(1);

        // Check if the returned value is a promise
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
    });
});