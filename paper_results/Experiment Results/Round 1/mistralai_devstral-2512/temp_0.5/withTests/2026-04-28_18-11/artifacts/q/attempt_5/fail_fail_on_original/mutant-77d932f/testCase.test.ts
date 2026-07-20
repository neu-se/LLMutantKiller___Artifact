// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly filter internal stack frames from error traces", () => {
        // Create a scenario that generates stack traces with internal frames
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

            // Test the stack trace filtering by checking internal function behavior
            // We'll test the isInternalFrame function indirectly through stack filtering
            const stack = capturedError!.stack;
            expect(stack).toBeDefined();

            // Create a mock stack line that should be identified as internal
            const mockStackLine = "at Promise.promiseDispatch (q.js:123:45)";

            // In the original code, this should be identified as an internal frame
            // In the mutated code, getFileNameAndLineNumber returns undefined
            // which causes isInternalFrame to return false

            // We can test this by checking if the stack contains internal Q frames
            // after filtering should have been applied
            const hasQFrames = stack!.includes('q.js') || stack!.includes('q:');

            // In original code with proper filtering, Q frames should be removed
            // In mutated code, they'll remain visible
            expect(hasQFrames).toBe(false);

            // Additional check: verify stack trace structure
            const lines = stack!.split('\n');
            expect(lines.length).toBeGreaterThan(0);

            // The first line should not contain Q internal references
            expect(lines[0].includes('q.js')).toBe(false);
            expect(lines[0].includes('q:')).toBe(false);
        });
    });
});