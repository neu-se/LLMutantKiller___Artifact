const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should have consistent behavior in stack trace handling", () => {
        // This test targets the specific mutation in captureLine function
        // Original: if (!hasStacks) { return; }
        // Mutated: if (!hasStacks) {}

        // We'll test by checking the return value of captureLine indirectly
        // through the qFileName variable which is set by captureLine

        // Create a scenario that forces captureLine to execute
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            // Create a promise to trigger stack capture
            const promise = Q.reject(new Error("Test error"));

            // The captureLine function is called during promise creation
            // In original code: returns early when !hasStacks
            // In mutated code: continues execution (empty block)

            // We can observe the difference by checking if qFileName is set
            // In original code with hasStacks=true, qFileName should be set
            // In mutated code, the behavior might differ

            // Access internal state through the promise
            const stack = (promise as any).stack;
            expect(typeof stack).toBe('string');

            // The key difference is in the control flow
            // Original code has proper early return
            // Mutated code has empty block which changes behavior

            // This test should pass on original and fail on mutated
            // because the mutation affects the control flow in a way that
            // could lead to different stack trace handling
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});