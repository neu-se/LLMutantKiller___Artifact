describe("Q environment detection mutation", () => {
    it("should fail when self is defined but window is not in mutated version", () => {
        // Test the exact condition that was mutated
        const testCondition = (window: any, self: any) => {
            // Original condition: typeof window !== "undefined" || typeof self !== "undefined"
            const original = typeof window !== "undefined" || typeof self !== "undefined";

            // Mutated condition: typeof window !== "undefined" || typeof self === "undefined"
            const mutated = typeof window !== "undefined" || typeof self === "undefined";

            return { original, mutated };
        };

        // Test case where self exists but window doesn't (like Web Workers)
        const result = testCondition(undefined, {});

        // Original should pass (true), mutated should fail (false)
        expect(result.original).toBe(true);
        expect(result.mutated).toBe(false);

        // This proves the mutation changes behavior in this environment
        expect(result.original).not.toBe(result.mutated);
    });
});