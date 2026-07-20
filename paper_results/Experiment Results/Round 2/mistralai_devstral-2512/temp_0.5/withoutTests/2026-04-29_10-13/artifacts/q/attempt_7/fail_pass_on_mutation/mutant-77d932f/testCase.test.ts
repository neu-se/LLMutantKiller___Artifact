// Test case to detect mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation", () => {
    it("should properly filter internal stack frames", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        return Q.resolve()
            .then(() => {
                throw new Error("Test error");
            })
            .catch((error: Error) => {
                // Create another promise to trigger long stack processing
                const deferred = Q.defer();
                deferred.reject(error);
                return deferred.promise;
            })
            .catch((error: Error) => {
                // Verify the error has a stack trace
                expect(error.stack).toBeDefined();

                // The key test: with the mutation, internal frames won't be filtered
                // because getFileNameAndLineNumber returns undefined
                // This should cause the stack to contain internal Q frames
                // which it shouldn't in the original version
                const hasQInternalFrames = error.stack!.includes("at ") &&
                                          !error.stack!.includes("From previous event:");
                expect(hasQInternalFrames).toBe(false);
            });
    });
});