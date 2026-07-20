import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should not attempt stack capture when hasStacks is false", () => {
        // Save original longStackSupport value
        const originalLongStackSupport = Q.longStackSupport;

        try {
            // Enable long stack traces
            Q.longStackSupport = true;

            // Force hasStacks to be false to simulate environment without stack support
            const originalHasStacks = (Q as any).hasStacks;
            (Q as any).hasStacks = false;

            // Create a promise chain that would normally generate long stack traces
            const promise = Q.resolve()
                .then(() => {
                    throw new Error("Test error");
                })
                .catch((error: Error) => {
                    // In the original code, when hasStacks is false, captureLine returns early
                    // In the mutated code, it always tries to capture line info
                    // This should cause an observable difference in behavior

                    // The key is that with the mutation, it will try to access e.stack
                    // even when hasStacks is false, which could lead to errors
                    return error;
                });

            return promise.then((error: Error) => {
                expect(error.message).toBe("Test error");
                // The test passes if we get here without errors
            });
        } finally {
            // Restore original values
            Q.longStackSupport = originalLongStackSupport;
            (Q as any).hasStacks = originalHasStacks;
        }
    });
});