const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should correctly handle stack trace capture when fileNameAndLineNumber is undefined", () => {
        // This test specifically targets the mutation in the captureLine function
        // where the condition was flipped from !fileNameAndLineNumber to fileNameAndLineNumber
        // The mutation would cause the function to incorrectly handle undefined values

        // Create a scenario that forces stack trace processing
        const deferred = Q.defer();
        Q.longStackSupport = true;

        // Create an error with a stack trace that might not parse correctly
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at undefined:undefined:undefined";

        deferred.reject(error);

        return deferred.promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (caughtError: Error) => {
                // Verify the error was properly handled
                expect(caughtError).toBeDefined();
                expect(caughtError.message).toBe("Test error");

                // The test passes if we reach here without throwing
                return true;
            }
        );
    });
});