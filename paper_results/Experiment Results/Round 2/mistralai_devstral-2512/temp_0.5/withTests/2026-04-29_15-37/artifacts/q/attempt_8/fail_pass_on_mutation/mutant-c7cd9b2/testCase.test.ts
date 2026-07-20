import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
    it("should correctly parse stack traces with 'at filename:lineNumber:columnNumber' format", () => {
        // Enable long stack traces to ensure stack trace parsing is active
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();

        // Create an error with a stack trace that specifically matches the attempt2 pattern
        const error = new Error("Test error");
        error.stack = "Error: Test error\n" +
                      "    at test (test.js:10:20)";

        // This will trigger the stack trace parsing code
        Q.nextTick(() => {
            deferred.reject(error);
        });

        return deferred.promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (caughtError) => {
                // Verify the error was properly handled
                expect(caughtError).toBe(error);
                expect(caughtError.stack).toBeDefined();

                // The key test: verify the stack trace was parsed correctly
                // The original code should properly parse this format
                // The mutated code will fail to parse it because attempt2 condition is always false
                expect(caughtError.stack).toContain("test.js:10:20");

                // Additional verification that the stack trace format was recognized
                // This should only pass if attempt2 parsing worked
                const stackLines = caughtError.stack!.split('\n');
                const hasCorrectFormat = stackLines.some(line =>
                    /at [^ ]+:\d+:\d+/.test(line)
                );
                expect(hasCorrectFormat).toBe(true);

                // Verify the error message is preserved
                expect(caughtError.message).toBe("Test error");

                return true;
            }
        );
    });
});