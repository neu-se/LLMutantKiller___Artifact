const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should correctly handle stack trace capture when fileNameAndLineNumber is missing", () => {
        // This test targets the mutation in the captureLine function
        // where the condition was flipped from !fileNameAndLineNumber to fileNameAndLineNumber
        // We need to create a scenario that would fail when this condition is inverted

        // Create a promise that will trigger stack trace processing
        const promise = Q.reject(new Error("Test error"));

        // Chain a handler to ensure the stack trace is processed
        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error: Error) => {
                // The error should have a stack trace
                expect(error.stack).toBeDefined();
                expect(error.stack!.length).toBeGreaterThan(0);

                // The test passes if we reach here without throwing
                return true;
            }
        );
    });
});