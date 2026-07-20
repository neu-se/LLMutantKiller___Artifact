import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when a promise is rejected and no error handler is provided in the original code but not in the mutated code', () => {
        const rejectPromise = Q.reject(new Error('Test error'));
        expect(() => rejectPromise.done()).toThrowError('Test error');
        // If the test passes, it means the original code is being used
        // If the test fails, it means the mutated code is being used
    });
});