import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
    it("should return undefined when hasStacks is false", () => {
        // This test directly checks the return value of captureLine
        // We need to access it through the Q module's internal state

        // Save original hasStacks value
        const originalHasStacks = (Q as any).hasStacks;

        try {
            // Force hasStacks to be false
            (Q as any).hasStacks = false;

            // Call captureLine indirectly by creating a promise
            // In the original code, it should return undefined when hasStacks is false
            // In the mutated code, it will always try to capture line info
            const promise = Q.resolve(42);

            return promise.then((value: number) => {
                expect(value).toBe(42);

                // Check the internal state that captureLine sets
                // In the original code, qFileName should remain undefined when hasStacks is false
                // In the mutated code, it might get set even when hasStacks is false
                const qFileName = (Q as any).qFileName;
                expect(qFileName).toBeUndefined();

                // Now test with an error to trigger stack trace handling
                return Q.reject(new Error("test")).catch((error: Error) => {
                    expect(error.message).toBe("test");

                    // The mutation would cause captureLine to always try to get stack info
                    // even when hasStacks is false, which could affect error handling
                    // This should be observable through the qFileName value
                    const qFileNameAfterError = (Q as any).qFileName;
                    expect(qFileNameAfterError).toBeUndefined();
                });
            });
        } finally {
            // Restore original value
            (Q as any).hasStacks = originalHasStacks;
        }
    });
});