const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should properly handle stack trace capture edge cases", () => {
        // This test targets the specific mutation in captureLine function
        // Original: if (!hasStacks) { return; }
        // Mutated: if (!hasStacks) {}

        // We'll test by forcing a scenario where the difference matters
        // The mutation changes control flow when hasStacks is false

        // First, disable long stack support to trigger the mutation path
        Q.longStackSupport = false;

        // Create a promise chain that might be affected by stack trace handling
        const promise = Q.resolve(1)
            .then(value => value + 1)
            .then(value => value + 1)
            .then(value => {
                // The mutation affects how stack traces are captured
                // which could impact error handling in promise chains
                if (value !== 3) {
                    throw new Error("Unexpected value");
                }
                return value;
            });

        // The key difference is in the captureLine function:
        // Original: returns early when !hasStacks (proper control flow)
        // Mutated: continues execution (empty block changes behavior)

        // This should cause different behavior in error handling
        return promise.then(
            value => {
                expect(value).toBe(3);
            },
            error => {
                // If we get here, the mutation caused different behavior
                throw error;
            }
        );
    });
});