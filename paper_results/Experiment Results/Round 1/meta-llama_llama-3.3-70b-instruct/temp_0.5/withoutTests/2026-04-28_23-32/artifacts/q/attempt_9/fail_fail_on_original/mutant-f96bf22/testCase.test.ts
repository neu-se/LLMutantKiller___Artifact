import { Q } from "./q.js";

describe('Q', () => {
    it('should filter internal frames from stack traces', () => {
        // Create a promise that throws an error
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            reject(new Error('Test error'));
        });

        // Catch the error and check the stack trace
        promise.catch((error: Error) => {
            const stackTrace = error.stack;
            expect(stackTrace).not.toContain('isInternalFrame');
        });
    });
});