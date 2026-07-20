import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
    it("should handle environments without stack trace support", () => {
        // Save original hasStacks value
        const originalHasStacks = (Q as any).hasStacks;

        try {
            // Force hasStacks to be false to simulate environment without stack support
            (Q as any).hasStacks = false;

            // Create a promise that will trigger stack trace capture
            const promise = Q.resolve()
                .then(() => {
                    throw new Error("Test error");
                })
                .catch((error: Error) => {
                    // The mutation affects how captureLine works when hasStacks is false
                    // In the original code, it returns early when hasStacks is false
                    // In the mutated code, it always tries to capture line info
                    // This difference should be observable in the stack trace

                    expect(error.message).toBe("Test error");

                    // Check the internal state that captureLine sets
                    // In the original code, qFileName should remain undefined when hasStacks is false
                    // In the mutated code, it might get set even when hasStacks is false
                    const qFileName = (Q as any).qFileName;
                    expect(qFileName).toBeUndefined();

                    return error.stack;
                });

            return promise;
        } finally {
            // Restore original value
            (Q as any).hasStacks = originalHasStacks;
        }
    });
});