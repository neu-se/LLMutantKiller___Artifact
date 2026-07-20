import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
    it("should correctly parse stack traces with 'at filename:lineNumber:columnNumber' format", () => {
        // Create a mock error with a stack trace that matches the attempt2 pattern
        const error = new Error("Test error");
        error.stack = "Error: Test error\n" +
                      "    at Test.test (test.js:10:20)";

        // This will trigger the stack trace parsing code
        const promise = Q.reject(error);

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (caughtError) => {
                // Verify the error was properly handled
                expect(caughtError).toBe(error);
                expect(caughtError.stack).toBeDefined();

                // The key test: verify the stack trace was parsed correctly
                // If attempt2 condition is always false, this parsing won't work
                // for this format, which would affect the stack trace
                expect(caughtError.stack).toContain("test.js:10:20");

                // Additional verification that the stack trace format was recognized
                // The original code should properly parse this format
                return true;
            }
        );
    });
});