// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should verify longStackSupport is enabled when Q_DEBUG is set", () => {
        // Save original environment
        const originalDebug = process.env.Q_DEBUG;
        const originalLongStack = Q.longStackSupport;

        try {
            // Set Q_DEBUG to trigger long stack support
            process.env.Q_DEBUG = "1";

            // Create a deferred promise
            const deferred = Q.defer();
            const error = new Error("Test error");

            // Create a promise chain
            const promise = Q(1).then(() => {
                return deferred.promise;
            });

            // Reject the promise
            deferred.reject(error);

            return promise.catch((err: any) => {
                // The key test: check if long stack support was enabled
                // In the original code, Q_DEBUG should enable long stack support
                // In the mutated code, it won't
                expect(Q.longStackSupport).toBe(true);

                // Verify error has stack trace
                expect(err).toHaveProperty('stack');
                expect(typeof err.stack).toBe('string');
            });
        } finally {
            // Clean up
            process.env.Q_DEBUG = originalDebug;
            Q.longStackSupport = originalLongStack;
        }
    });
});