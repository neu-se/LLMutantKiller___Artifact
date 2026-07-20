import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
    it("should handle missing stack property when hasStacks is false", () => {
        // Save original hasStacks value
        const originalHasStacks = (Q as any).hasStacks;

        try {
            // Force hasStacks to be false
            (Q as any).hasStacks = false;

            // Create a promise that will trigger stack trace capture
            // The mutation affects how captureLine works when hasStacks is false
            const promise = Q.resolve()
                .then(() => {
                    // Create an error without stack property
                    const error = new Error("Test error");
                    delete error.stack;
                    throw error;
                })
                .catch((error: Error) => {
                    expect(error.message).toBe("Test error");

                    // In the original code, captureLine returns early when hasStacks is false
                    // so this should work fine
                    // In the mutated code, it tries to access e.stack which doesn't exist
                    // which should cause an error in the stack trace filtering
                });

            return promise;
        } finally {
            // Restore original value
            (Q as any).hasStacks = originalHasStacks;
        }
    });
});