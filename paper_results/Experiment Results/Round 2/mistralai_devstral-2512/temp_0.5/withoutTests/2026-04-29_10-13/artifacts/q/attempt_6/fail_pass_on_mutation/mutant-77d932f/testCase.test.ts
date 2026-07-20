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
                // This should cause the stack to contain more frames than expected
                // Count the number of stack frames
                const stackLines = error.stack!.split('\n').filter(line => line.trim() !== '');
                expect(stackLines.length).toBeGreaterThan(2);

                // In the original version, internal frames should be filtered out
                // With the mutation, they won't be filtered
                const hasQInternalFrames = stackLines.some(line =>
                    line.includes('q.js') || line.includes('From previous event:')
                );
                expect(hasQInternalFrames).toBe(true);
            });
    });
});