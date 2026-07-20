// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
    it("should properly detect CommonJS environment with exports object", () => {
        // This test verifies the specific condition that was mutated
        // The mutation changes `typeof exports === "object"` to just `true`
        // We need to test behavior that would differ between these conditions

        // Create a mock environment where exports doesn't exist
        // but module does (which would trigger the mutation)
        const mockModule = { exports: {} };
        const originalExports = global.exports;

        try {
            // Temporarily remove exports from global scope
            global.exports = undefined;

            // In the original code, this should not export Q because exports is undefined
            // In the mutated code, it would export Q because the condition is just `true`
            // We need to test this by requiring the module fresh
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const testModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // In original code, testModule should be undefined or not the Q function
            // In mutated code, testModule would be the Q function
            if (typeof testModule === "function") {
                // This means the mutation is present (condition is just `true`)
                return Promise.reject(new Error("Module was exported when it shouldn't be"));
            }
            return Promise.resolve();
        } finally {
            // Restore original exports
            global.exports = originalExports;
            // Clear require cache to avoid affecting other tests
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        }
    });
});