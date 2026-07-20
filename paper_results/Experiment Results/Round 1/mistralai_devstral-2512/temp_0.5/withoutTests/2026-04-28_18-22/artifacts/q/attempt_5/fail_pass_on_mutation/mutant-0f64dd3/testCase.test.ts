const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should handle missing stack trace information gracefully", () => {
        // This test targets the mutation in the captureLine function
        // where the condition was flipped from !fileNameAndLineNumber to fileNameAndLineNumber
        // The mutation would cause the function to incorrectly handle missing stack info

        // Create a promise that will trigger stack trace processing
        const promise = Q.reject(new Error("Test error"));

        // Force long stack support to ensure stack trace processing
        Q.longStackSupport = true;

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error: Error) => {
                // The error should have a stack trace
                expect(error.stack).toBeDefined();
                expect(error.stack!.length).toBeGreaterThan(0);

                // Verify the stack trace doesn't contain Q's internal frames
                // when long stack support is enabled
                expect(error.stack).not.toContain("q.js");
                return true;
            }
        );
    });
});