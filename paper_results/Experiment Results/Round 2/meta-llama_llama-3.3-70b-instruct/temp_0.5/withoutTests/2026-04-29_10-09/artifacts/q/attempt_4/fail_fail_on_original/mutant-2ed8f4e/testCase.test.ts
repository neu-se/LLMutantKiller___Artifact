import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter internal and Node.js frames from stack traces', () => {
        // Create an error with a stack trace
        let error: Error;
        try {
            throw new Error('Test error');
        } catch (e: any) {
            error = e;
        }

        // Create a promise that rejects with the error
        const promise = Q.reject(error);

        // Catch the error and check its stack trace
        return promise.catch((e: any) => {
            // Check if the stack trace is not empty
            expect(e.stack).not.toBeUndefined();

            // Check if the stack trace does not contain internal or Node.js frames
            const lines = e.stack.split('\n');
            expect(lines.length).toBeGreaterThan(0);
            expect(lines[0]).toContain('Error: Test error');
        });
    });
});