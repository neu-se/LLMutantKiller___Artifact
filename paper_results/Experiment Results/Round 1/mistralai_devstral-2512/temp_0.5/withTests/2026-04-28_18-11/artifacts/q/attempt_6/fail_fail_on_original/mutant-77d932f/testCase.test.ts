// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly identify and filter internal stack frames", () => {
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
            expect(capturedError).not.toBeNull();

            const stack = capturedError!.stack;
            expect(stack).toBeDefined();

            // Test the stack trace filtering by checking for specific patterns
            // In the original code, internal Q frames should be filtered out
            // In the mutated code, getFileNameAndLineNumber returns undefined
            // which causes isInternalFrame to return false for all frames

            // Check for common stack trace patterns that should be filtered
            const hasInternalPatterns = stack!.includes('promiseDispatch') ||
                                       stack!.includes('Promise.promiseDispatch') ||
                                       stack!.includes('q.js');

            // In original code with proper filtering, internal patterns should be removed
            // In mutated code, they'll remain visible
            expect(hasInternalPatterns).toBe(false);

            // Additional verification: check that the stack trace is properly formatted
            const lines = stack!.split('\n');
            expect(lines.length).toBeGreaterThan(0);

            // The stack trace should not contain Q internal function references
            const hasQInternalRefs = lines.some(line =>
                line.includes('promiseDispatch') ||
                line.includes('q.js') ||
                line.includes('q:')
            );

            expect(hasQInternalRefs).toBe(false);
        });
    });
});