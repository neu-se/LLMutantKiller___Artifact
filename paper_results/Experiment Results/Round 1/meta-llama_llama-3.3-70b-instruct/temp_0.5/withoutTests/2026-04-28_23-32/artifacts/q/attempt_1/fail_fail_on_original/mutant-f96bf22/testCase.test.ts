import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should filter internal frames from stack traces', () => {
        // Create a promise that throws an error
        const promise = Q(function(resolve, reject) {
            reject(new Error('Test error'));
        });

        // Catch the error and check the stack trace
        promise.catch((error) => {
            const stackTrace = error.stack;
            expect(stackTrace).not.toContain('q.js');
        });
    });
});