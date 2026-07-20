const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString behavior", () => {
    it("should filter internal frames from stack traces", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Set up a promise chain that will be rejected
        const promise = deferred.promise.then(() => {
            throw error;
        });

        // Reject the deferred to trigger the error handling
        deferred.reject(error);

        // Return the promise and check the stack trace
        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (e: any) => {
                // Check that internal Q frames are filtered out in original code
                // but will be included in mutated code
                const hasInternalFrames = e.stack.includes("q.js");
                expect(hasInternalFrames).toBe(false);
                Q.longStackSupport = false;
            }
        );
    });
});