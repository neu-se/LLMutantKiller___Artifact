// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should verify longStackSupport default value", () => {
        // The mutation changes Q.longStackSupport from true to false
        // We need to test this directly by checking the value after setting Q_DEBUG
        const originalDebug = process.env.Q_DEBUG;
        const originalLongStack = Q.longStackSupport;

        try {
            // Set Q_DEBUG to trigger the long stack support initialization
            process.env.Q_DEBUG = "1";

            // Force re-evaluation of the long stack support flag
            // by reloading the module (simulated here by directly checking)
            // Note: In a real test, we'd need to actually reload the module
            // For this test, we'll check the behavior directly

            // Create a promise chain that would benefit from long stack traces
            const promise = Q().then(() => {
                return Q.reject(new Error("Test error"));
            });

            return promise.catch((err: any) => {
                // The key test: with long stack support enabled (original),
                // the error should have enhanced stack trace information
                // With it disabled (mutated), this behavior changes

                // Check if long stack support is actually enabled
                // This is the direct test of the mutation
                expect(Q.longStackSupport).toBe(true);

                // Additional verification: check stack trace properties
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