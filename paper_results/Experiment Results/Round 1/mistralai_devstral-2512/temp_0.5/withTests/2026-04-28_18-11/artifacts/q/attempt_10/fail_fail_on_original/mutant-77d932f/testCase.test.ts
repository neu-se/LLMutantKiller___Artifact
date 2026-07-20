// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly identify and filter internal stack frames from error traces", () => {
        // Create a promise chain that will generate stack traces with internal frames
        const deferred = Q.defer();
        let capturedError: Error | null = null;

        // Create a deeply nested promise chain to generate multiple stack frames
        Q().then(() => {
            return Q().then(() => {
                return Q().then(() => {
                    throw new Error("Deep nested error");
                });
            });
        }).catch((err: Error) => {
            capturedError = err;
            deferred.resolve();
        });

        return deferred.promise.then(() => {
            expect(capturedError).not.toBeNull();

            const stack = capturedError!.stack;
            expect(stack).toBeDefined();

            // Count the number of stack frames that contain Q internal function references
            const stackLines = stack!.split('\n');
            const qInternalFrames = stackLines.filter(line =>
                line.includes('q.js') || line.includes('q:')
            );

            // In the original code, most Q internal frames should be filtered out
            // In the mutated code, getFileNameAndLineNumber returns undefined
            // which causes isInternalFrame to return false, leaving more frames visible
            expect(qInternalFrames.length).toBeLessThanOrEqual(2);

            // Additional check: verify that the stack trace is properly formatted
            const hasValidFormat = stackLines.some(line =>
                /at [^(]+ \(.+:\d+:\d+\)$/.test(line) ||
                /at .+:\d+:\d+$/.test(line) ||
                /.*@.+:\d+$/.test(line)
            );

            expect(hasValidFormat).toBe(true);
        });
    });
});