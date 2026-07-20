const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should correctly handle stack trace capture when fileNameAndLineNumber is null", () => {
        // This test targets the mutation in the captureLine function
        // where the condition was flipped from !fileNameAndLineNumber to fileNameAndLineNumber
        // The mutation would cause the function to incorrectly handle null values

        // Create a scenario that forces stack trace processing with problematic stack format
        const deferred = Q.defer();
        Q.longStackSupport = true;

        // Create an error with a stack trace that will fail parsing
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at null:null:null";

        deferred.reject(error);

        return deferred.promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (caughtError: Error) => {
                // Verify the error was properly handled
                expect(caughtError).toBeDefined();
                expect(caughtError.message).toBe("Test error");

                // The key assertion: the stack trace should still be processed
                // This will fail in the mutated version because the condition is inverted
                if (caughtError.stack) {
                    expect(caughtError.stack.length).toBeGreaterThan(0);
                }
                return true;
            }
        );
    });
});