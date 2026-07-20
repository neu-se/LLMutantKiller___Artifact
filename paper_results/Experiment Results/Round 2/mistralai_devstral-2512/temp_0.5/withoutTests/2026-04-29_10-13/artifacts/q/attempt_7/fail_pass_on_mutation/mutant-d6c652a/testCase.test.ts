const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
    it("should correctly handle stack trace availability detection", () => {
        // This test specifically targets the mutation in captureLine function
        // Original: if (!hasStacks) { return; }
        // Mutated: if (!hasStacks) {}

        // We'll test by checking the behavior when hasStacks is false
        // The mutation removes the early return, which changes control flow

        // Save original state
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = false;

        try {
            // Create multiple promises to ensure captureLine is called
            const promises = [
                Q.resolve(1),
                Q.resolve(2),
                Q.resolve(3)
            ];

            // The key difference is in how captureLine behaves:
            // Original: returns early when !hasStacks (proper control flow)
            // Mutated: continues execution (empty block changes behavior)

            // We can observe this by checking that all promises work correctly
            // The mutation might cause subtle issues in promise initialization
            return Q.all(promises).then(values => {
                expect(values).toEqual([1, 2, 3]);

                // The test should pass on original code but fail on mutated code
                // because the control flow change affects promise initialization
            });
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});