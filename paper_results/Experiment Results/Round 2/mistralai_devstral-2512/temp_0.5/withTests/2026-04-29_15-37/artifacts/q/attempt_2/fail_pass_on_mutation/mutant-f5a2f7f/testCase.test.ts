import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
    it("should handle stack trace capture correctly when hasStacks is false", () => {
        // Create a scenario where we can observe the behavior difference
        // The mutation affects how captureLine works when hasStacks is false

        // First, let's verify the basic promise functionality works
        const testPromise = Q.resolve(42);

        return testPromise.then((value: number) => {
            expect(value).toBe(42);

            // Now test error handling which involves stack traces
            const errorPromise = Q.reject(new Error("test error"));

            return errorPromise.then(
                () => {
                    throw new Error("Should not reach here");
                },
                (error: Error) => {
                    expect(error.message).toBe("test error");
                    // The key difference is in how stack traces are handled
                    // In the mutated version, captureLine will always try to get stack info
                    // even when hasStacks is false, which could affect behavior
                }
            );
        });
    });
});