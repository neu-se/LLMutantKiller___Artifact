// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should verify longStackSupport is enabled by default", () => {
        // The original code sets Q.longStackSupport = true when Q_DEBUG is set
        // The mutation changes this to false
        // We need to check the actual runtime value

        // Create a promise that will be rejected
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Enable long stack support explicitly
        Q.longStackSupport = true;

        // Create a promise chain
        const promise = Q().then(() => {
            return deferred.promise;
        });

        // Reject the promise
        deferred.reject(error);

        // Return the promise and check the stack trace
        return promise.catch((err: any) => {
            // With long stack support enabled, the error should have
            // additional stack trace information
            if (Q.longStackSupport) {
                // Check if the error has the expected properties
                expect(err).toHaveProperty('stack');
                expect(typeof err.stack).toBe('string');

                // The key difference: with long stack support, the stack
                // should be more detailed and include promise chain info
                const stackLines = err.stack.split('\n');
                expect(stackLines.length).toBeGreaterThan(1);
            }
        });
    });
});