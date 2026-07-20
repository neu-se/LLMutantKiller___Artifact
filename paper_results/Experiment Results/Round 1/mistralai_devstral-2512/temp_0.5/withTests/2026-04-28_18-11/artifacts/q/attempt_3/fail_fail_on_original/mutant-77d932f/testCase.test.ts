// Test case to detect the mutation in getFileNameAndLineNumber function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly identify internal stack frames when long stack traces are enabled", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        let capturedError: Error | null = null;

        // Create a nested promise chain to generate multiple stack frames
        Q().then(() => {
            return Q().then(() => {
                throw new Error("Test error");
            });
        }).catch((err: Error) => {
            capturedError = err;
            deferred.resolve();
        });

        return deferred.promise.then(() => {
            // The error should have a stack trace
            expect(capturedError).not.toBeNull();
            expect(capturedError!.stack).toBeDefined();

            // In the original code, internal Q frames should be filtered out
            // In the mutated code, getFileNameAndLineNumber returns undefined
            // which causes isInternalFrame to return false for all frames
            // This means internal frames won't be filtered properly

            // We can detect this by checking if Q's internal frames appear in the stack
            const stack = capturedError!.stack;
            const hasQFrames = stack!.includes('q.js') || stack!.includes('q:');

            // In original code with proper filtering, Q frames should be removed
            // In mutated code, they'll remain visible
            expect(hasQFrames).toBe(false);
        });
    });
});