// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
    it("should only export Q when both exports and module objects exist", () => {
        // This test verifies the specific condition that was mutated
        // The mutation changes `typeof exports === "object"` to just `true`
        // We need to test behavior that would differ between these conditions

        // Store original module and exports
        const originalModule = global.module;
        const originalExports = global.exports;

        try {
            // Set up a test case where module exists but exports doesn't
            global.module = { exports: {} };
            global.exports = undefined;

            // Clear the module cache to force a fresh load
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

            // Try to require Q again
            const testModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // In the original code, testModule should not be the Q function
            // because exports is undefined (condition `typeof exports === "object"` fails)
            // In the mutated code, testModule would be the Q function
            // because the condition is just `true`

            if (typeof testModule === "function" && testModule.defer) {
                // This means the mutation is present (condition is just `true`)
                // The module was exported when it shouldn't have been
                return Promise.reject(new Error("Q was exported when exports object doesn't exist"));
            }

            // If we get here, the original behavior is correct
            return Promise.resolve();
        } finally {
            // Restore original module and exports
            global.module = originalModule;
            global.exports = originalExports;
            // Clear require cache to avoid affecting other tests
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        }
    });
});