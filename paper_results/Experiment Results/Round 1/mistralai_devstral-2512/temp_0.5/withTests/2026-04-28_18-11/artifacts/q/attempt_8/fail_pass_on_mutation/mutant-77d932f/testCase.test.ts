// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly filter internal stack frames when long stack support is enabled", () => {
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

            // Count occurrences of Q internal function names in the stack trace
            const qInternalFunctions = ['promiseDispatch', 'makeStackTraceLong', 'captureLine'];
            const stackLines = stack!.split('\n');

            let internalFrameCount = 0;
            for (const line of stackLines) {
                if (qInternalFunctions.some(func => line.includes(func))) {
                    internalFrameCount++;
                }
            }

            // In the original code with proper filtering, internal frames should be minimal
            // In the mutated code, getFileNameAndLineNumber returns undefined
            // which causes isInternalFrame to return false, leaving more internal frames visible
            expect(internalFrameCount).toBeLessThan(3);

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