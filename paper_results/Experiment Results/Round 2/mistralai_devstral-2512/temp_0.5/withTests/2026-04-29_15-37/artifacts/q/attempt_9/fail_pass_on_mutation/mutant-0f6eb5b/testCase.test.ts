// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should verify longStackSupport behavior with Q_DEBUG environment variable", () => {
        // Save original environment and settings
        const originalDebug = process.env.Q_DEBUG;
        const originalLongStack = Q.longStackSupport;

        try {
            // Set Q_DEBUG to trigger long stack support initialization
            process.env.Q_DEBUG = "1";

            // Create a promise chain that would benefit from long stack traces
            const deferred = Q.defer();
            const error = new Error("Test error");

            // Create promise chain
            const promise = Q(1).then(() => {
                return deferred.promise;
            });

            // Reject the promise
            deferred.reject(error);

            return promise.catch((err: any) => {
                // Verify the error has stack trace
                expect(err).toHaveProperty('stack');
                expect(typeof err.stack).toBe('string');

                // The key test: check if long stack support is actually enabled
                // This directly tests the mutation point
                // In original code: Q.longStackSupport should be true when Q_DEBUG is set
                // In mutated code: Q.longStackSupport will be false
                if (process.env.Q_DEBUG === "1") {
                    expect(Q.longStackSupport).toBe(true);
                }
            });
        } finally {
            // Clean up
            process.env.Q_DEBUG = originalDebug;
            Q.longStackSupport = originalLongStack;
        }
    });
});