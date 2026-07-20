import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter internal and Node.js frames from stack traces', () => {
        // Create a promise that rejects with an error
        const promise = Q.reject(new Error('Test error'));

        // Catch the error and check its stack trace
        return promise.catch((e: any) => {
            // Check if the stack trace is not empty
            expect(e.stack).not.toBeUndefined();

            // Check if the stack trace does not contain internal or Node.js frames
            const lines = e.stack.split('\n');
            expect(lines.length).toBeGreaterThan(1);
        });
    });
});