import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
    it("should not attempt stack trace capture when hasStacks is false", () => {
        // Save original hasStacks value
        const originalHasStacks = (Q as any).hasStacks;

        try {
            // Force hasStacks to be false
            (Q as any).hasStacks = false;

            // Create a promise that will trigger stack trace capture
            const promise = Q.resolve()
                .then(() => {
                    throw new Error("Test error");
                })
                .catch((error: Error) => {
                    expect(error.message).toBe("Test error");

                    // Check internal state that captureLine sets
                    // In original code, qFileName should remain undefined when hasStacks is false
                    // In mutated code, it will try to set qFileName even when hasStacks is false
                    const qFileName = (Q as any).qFileName;
                    expect(qFileName).toBeUndefined();

                    // Also check qStartingLine
                    const qStartingLine = (Q as any).qStartingLine;
                    expect(qStartingLine).toBeUndefined();
                });

            return promise;
        } finally {
            // Restore original value
            (Q as any).hasStacks = originalHasStacks;
        }
    });
});