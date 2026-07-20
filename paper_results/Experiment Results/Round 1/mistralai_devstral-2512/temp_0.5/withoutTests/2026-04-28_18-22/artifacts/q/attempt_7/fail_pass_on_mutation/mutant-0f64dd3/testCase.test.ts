const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should handle stack trace parsing edge cases correctly", () => {
        // This test targets the mutation in the captureLine function
        // where the condition was flipped from !fileNameAndLineNumber to fileNameAndLineNumber
        // The mutation would cause incorrect behavior when stack parsing fails

        // Create a promise that will trigger stack trace processing
        const promise = Q.reject(new Error("Test error"));

        // Force long stack support to ensure stack trace processing
        Q.longStackSupport = true;

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error: Error) => {
                // Verify the error was properly handled
                expect(error).toBeDefined();
                expect(error.message).toBe("Test error");

                // The key assertion: the stack trace should be properly filtered
                // This will fail in the mutated version because the condition is inverted
                if (error.stack) {
                    expect(error.stack).not.toContain("From previous event:");
                }
                return true;
            }
        );
    });
});