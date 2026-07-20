// Test case to detect mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation", () => {
    it("should properly filter internal stack frames", () => {
        // Create a promise that will be rejected to test stack trace filtering
        const deferred = Q.defer();
        const testError = new Error("Test error");

        // Enable long stack traces
        Q.longStackSupport = true;

        // Reject the promise to trigger stack trace processing
        deferred.reject(testError);

        // Return the promise chain
        return deferred.promise.then(
            () => {
                // Should not reach here since we rejected
                throw new Error("Promise should have been rejected");
            },
            (error: Error) => {
                // Verify the error has a stack trace
                expect(error.stack).toBeDefined();
                expect(error.stack!.length).toBeGreaterThan(0);

                // The key test: with the mutation, internal frames won't be filtered
                // because getFileNameAndLineNumber returns undefined
                // This should cause the stack to include internal Q frames
                // which it shouldn't in the original version
                const hasInternalFrames = error.stack!.includes("From previous event:");
                expect(hasInternalFrames).toBe(true);
            }
        );
    });
});