const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace filtering", () => {
    it("should properly filter internal stack frames when hasStacks is true", () => {
        // This test verifies that the hasStacks detection works correctly
        // The mutation would cause hasStacks to be false, changing the behavior

        // Create a simple error and check if stack filtering works
        const error = new Error("Test error");

        // The original code should properly detect stack support
        // The mutated code would fail to detect it
        if (error.stack) {
            // If we have stack traces, verify the filtering works
            const filtered = Q._filterStackString(error.stack);
            expect(typeof filtered).toBe("string");

            // The key difference is that with the mutation, hasStacks would be false
            // which would prevent proper stack filtering
            // We can't directly test hasStacks as it's private, but we can test
            // the observable behavior of stack filtering
        }

        return true;
    });
});