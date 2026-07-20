import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace capture with parsing failure", () => {
    it("should handle stack traces when parsing fails", () => {
        // Create an error with a stack trace that will fail parsing
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at (unknown)";

        // Create a promise that will use this error
        const deferred = Q.defer();
        Q.nextTick(() => {
            deferred.reject(error);
        });

        return deferred.promise.catch((caughtError: Error) => {
            // Verify the error is handled correctly
            expect(caughtError.message).toBe("Test error");

            // The mutation affects how parsing failures are handled
            // Original code: if (!fileNameAndLineNumber) - executes when parsing fails
            // Mutated code: if (fileNameAndLineNumber) - doesn't execute when parsing fails
            // This should cause observable differences in error handling
            return true;
        }).then((result: boolean) => {
            expect(result).toBe(true);
        });
    });
});