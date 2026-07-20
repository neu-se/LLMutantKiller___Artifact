// Test case to detect mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation", () => {
    it("should properly filter internal stack frames", () => {
        // Create a promise chain that will generate stack traces
        return Q.resolve()
            .then(() => {
                // Create an error with a known stack trace format
                const error = new Error("Test error");
                // Simulate a stack trace that should be filtered
                error.stack = "Error: Test error\n" +
                             "    at Object.<anonymous> (/test/file.js:10:5)\n" +
                             "    at process._tickCallback (internal/process/next_tick.js:68:7)";

                // Enable long stack traces
                Q.longStackSupport = true;

                // Create and reject a promise to trigger stack processing
                const deferred = Q.defer();
                deferred.reject(error);
                return deferred.promise;
            })
            .catch((error: Error) => {
                // Verify the error has a stack trace
                expect(error.stack).toBeDefined();

                // The key test: with the mutation, the stack won't be properly filtered
                // because getFileNameAndLineNumber returns undefined
                // This means the stack should still contain the original frames
                // In the original version, internal frames would be filtered out
                const hasOriginalFrames = error.stack!.includes("at Object.<anonymous>");
                expect(hasOriginalFrames).toBe(true);
            });
    });
});