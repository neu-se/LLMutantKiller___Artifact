import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
    it("should not throw when hasStacks is false and error has no stack", () => {
        // Create an error without a stack property to simulate environment without stack support
        const errorWithoutStack = new Error("Test error");
        delete errorWithoutStack.stack;

        // Save original hasStacks value
        const originalHasStacks = (Q as any).hasStacks;

        try {
            // Force hasStacks to be false
            (Q as any).hasStacks = false;

            // Create a rejected promise with our error
            const promise = Q.reject(errorWithoutStack);

            return promise.catch((error: Error) => {
                expect(error.message).toBe("Test error");

                // In the original code, captureLine returns early when hasStacks is false
                // so this should work fine
                // In the mutated code, it tries to access e.stack which doesn't exist
                // which should cause an error
            });
        } finally {
            // Restore original value
            (Q as any).hasStacks = originalHasStacks;
        }
    });
});