import { Q } from "./q";

describe('Q', () => {
    it('should filter internal frames from stack traces', () => {
        const error = new Error();
        const originalStack = error.stack;

        // Create a promise that will be rejected
        const promise = Q.reject(error);

        // Catch the promise and make sure the stack trace is filtered
        promise.catch((err: any) => {
            const filteredStack = err.stack;

            // Check that the filtered stack does not contain internal frames
            expect(filteredStack).not.toContain('filterStackString');
            expect(filteredStack).not.toContain('makeStackTraceLong');
        });
    });
});