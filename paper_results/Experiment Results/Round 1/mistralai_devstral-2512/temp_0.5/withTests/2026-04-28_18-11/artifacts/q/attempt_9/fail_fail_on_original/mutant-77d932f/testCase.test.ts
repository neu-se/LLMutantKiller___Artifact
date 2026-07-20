// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly parse stack trace lines and identify internal frames", () => {
        // Create a promise that will generate a stack trace with internal frames
        const deferred = Q.defer();
        let capturedError: Error | null = null;

        // Create a promise chain that will generate internal stack frames
        Q().then(() => {
            return Q().then(() => {
                throw new Error("Test error with stack trace");
            });
        }).catch((err: Error) => {
            capturedError = err;
            deferred.resolve();
        });

        return deferred.promise.then(() => {
            expect(capturedError).not.toBeNull();

            const stack = capturedError!.stack;
            expect(stack).toBeDefined();

            // Test specific stack trace patterns that should be filtered
            const stackLines = stack!.split('\n');
            const hasQInternalFrames = stackLines.some(line =>
                (line.includes('q.js') && line.includes('promiseDispatch')) ||
                (line.includes('q:') && line.includes('promiseDispatch'))
            );

            // In the original code, internal Q frames should be filtered out
            // In the mutated code, getFileNameAndLineNumber returns undefined
            // which causes isInternalFrame to return false, leaving internal frames visible
            expect(hasQInternalFrames).toBe(false);

            // Additional verification: check that the stack trace contains valid frames
            const hasValidFrames = stackLines.some(line =>
                /at [^(]+ \(.+:\d+:\d+\)$/.test(line) ||
                /at .+:\d+:\d+$/.test(line) ||
                /.*@.+:\d+$/.test(line)
            );

            expect(hasValidFrames).toBe(true);
        });
    });
});