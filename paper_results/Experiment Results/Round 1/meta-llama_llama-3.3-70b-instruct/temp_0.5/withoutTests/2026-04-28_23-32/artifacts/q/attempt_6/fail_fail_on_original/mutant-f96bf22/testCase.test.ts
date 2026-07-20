import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter internal frames from stack traces', () => {
        // Create a promise that throws an error
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            reject(new Error('Test error'));
        });

        // Catch the error and check the stack trace
        promise.then(() => {
            throw new Error('This should not be reached');
        }).catch((error: Error) => {
            const stackTrace = error.stack;
            expect(stackTrace).toContain('q.js');
        });
    });
});