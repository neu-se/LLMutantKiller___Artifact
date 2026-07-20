import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle Node frames in stack traces', () => {
        // Create a new promise
        const promise = Q((resolve, reject) => {
            // Reject the promise with an error
            reject(new Error('Test error'));
        });

        // Catch the error and check if the stack trace is correctly filtered
        promise.catch((error) => {
            const stackTrace = error.stack;
            expect(stackTrace).not.toContain('(module.js:');
            expect(stackTrace).not.toContain('(node.js:');
        });
    });
});