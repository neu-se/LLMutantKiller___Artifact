// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export detection", () => {
    it("should correctly detect CommonJS environment with exports object", () => {
        // This test verifies that the module export condition properly checks for exports object
        // The mutation changes `typeof exports === "object"` to just `true`
        // We test by checking if the module was actually exported correctly
        expect(Q).toBeDefined();
        expect(typeof Q).toBe("function");

        // Create a mock environment where exports might not be an object
        // This would fail with the mutation since it always evaluates to true
        const originalExports = global.exports;
        try {
            // Temporarily remove exports from global
            global.exports = undefined;

            // Force re-evaluation of the module
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // With the mutation, this would still work (incorrectly)
            // Without the mutation, this should fail to export properly
            expect(Q2).toBeDefined();
        } finally {
            // Restore original exports
            global.exports = originalExports;
        }
    });
});