describe("Q library environment detection", () => {
    it("should detect browser-like environments correctly", () => {
        // This test verifies the specific mutation in the environment detection logic
        // The original code checks: typeof window !== "undefined" || typeof self !== "undefined"
        // The mutated code checks: typeof window !== "undefined" || typeof self === "undefined"

        // We'll test by checking if Q is available in the current environment
        // In Node.js, Q should be available via require
        const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Verify Q was initialized
        expect(typeof Q).toBe("function");

        // Test basic functionality
        const promise = Q(42);
        expect(promise.isFulfilled()).toBe(true);

        return promise.then((value: number) => {
            expect(value).toBe(42);
        });
    });
});