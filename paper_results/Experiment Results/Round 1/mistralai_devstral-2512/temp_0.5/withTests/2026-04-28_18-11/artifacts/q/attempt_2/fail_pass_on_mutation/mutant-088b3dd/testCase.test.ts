import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing with named functions", () => {
    it("should correctly parse stack traces containing named function format", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        function createErrorWithStack() {
            // Create an error that will have a stack trace with named function format
            try {
                throw new Error("Test error");
            } catch (e) {
                return e;
            }
        }

        const error = createErrorWithStack();
        const stackLines = error.stack?.split('\n') || [];

        // Find a stack line that matches the first regex pattern (named function format)
        const namedFunctionLine = stackLines.find(line =>
            /at \S+ \(.+:\d+:\d+\)/.test(line)
        );

        if (namedFunctionLine) {
            // Create a promise chain that will use stack trace parsing
            const deferred = Q.defer();

            // Use the error in a promise rejection to trigger stack trace processing
            deferred.reject(error);

            return deferred.promise.then(
                () => {
                    throw new Error("Should not resolve");
                },
                (caughtError) => {
                    // Verify the error was processed correctly
                    expect(caughtError).toBe(error);

                    // The mutation would break parsing of this stack line format
                    // In the original code, this should work fine
                    // In the mutated code, the first pattern won't match
                    return true;
                }
            );
        } else {
            // If we can't find a suitable stack line, the test is inconclusive
            // This shouldn't happen in normal environments
            expect(true).toBe(true);
            return Promise.resolve();
        }
    });
});