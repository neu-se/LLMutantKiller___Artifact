import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should filter internal frames from stack traces', () => {
        // Create a promise that rejects with an error
        const promise = Q.reject(new Error('Test error'));

        // Catch the error and get its stack trace
        let stackTrace: string | undefined;
        promise.catch((error) => {
            stackTrace = error.stack;
        });

        // Wait for the promise to settle
        promise.then(() => {
            // Check if the stack trace contains the line number of the error
            const errorLine = new Error().stack?.split('\n')[1];
            expect(stackTrace).not.toContain(errorLine);
        });
    });
});