// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should verify longStackSupport is enabled by default when Q_DEBUG is set", () => {
        // Save original environment
        const originalDebug = process.env.Q_DEBUG;
        const originalLongStack = Q.longStackSupport;

        try {
            // Set Q_DEBUG to trigger long stack support
            process.env.Q_DEBUG = "1";

            // Force re-evaluation by creating a new promise
            // This should trigger the Q_DEBUG check in the original code
            const promise = Q(1);

            // The key test: check if long stack support was enabled
            // In the original code, Q_DEBUG should enable long stack support
            // In the mutated code, it won't
            expect(Q.longStackSupport).toBe(true);

            return promise;
        } finally {
            // Clean up
            process.env.Q_DEBUG = originalDebug;
            Q.longStackSupport = originalLongStack;
        }
    });
});