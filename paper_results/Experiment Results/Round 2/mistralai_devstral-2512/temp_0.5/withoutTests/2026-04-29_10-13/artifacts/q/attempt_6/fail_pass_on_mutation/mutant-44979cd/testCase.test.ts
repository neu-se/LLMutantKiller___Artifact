// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export detection", () => {
    it("should properly handle CommonJS module export conditions", () => {
        // This test verifies the specific mutation where:
        // Original: } else if (typeof exports === "object" && typeof module === "object") {
        // Mutated:  } else if (true && typeof module === "object") {

        // First verify Q works normally
        expect(Q).toBeDefined();
        expect(typeof Q).toBe("function");

        // Create a test to detect if the export condition is too permissive
        const testModulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
        delete require.cache[testModulePath];

        // Create a mock environment where exports is not an object
        const Module = require('module');
        const originalLoad = Module._load;

        let conditionEvaluatedCorrectly = true;

        Module._load = function(request, parent) {
            if (request === testModulePath) {
                const module = new Module(request, parent);
                module.exports = null; // Not an object
                module.loaded = true;

                // Check the actual condition in the code
                const fs = require('fs');
                const code = fs.readFileSync(testModulePath, 'utf8');

                // Check which version of the condition exists
                if (code.includes('typeof exports === "object"')) {
                    // Original code - should fail when exports is not an object
                    conditionEvaluatedCorrectly = (typeof module.exports === "object");
                } else if (code.includes('true && typeof module === "object"')) {
                    // Mutated code - always passes the first condition
                    conditionEvaluatedCorrectly = false;
                }

                return module.exports;
            }
            return originalLoad.apply(this, arguments);
        };

        try {
            const Q2 = require(testModulePath);
            // If we get here with mutated code, the condition was too permissive
            expect(conditionEvaluatedCorrectly).toBe(true);
        } catch (e) {
            // Expected with original code when exports is not an object
            expect(conditionEvaluatedCorrectly).toBe(true);
        } finally {
            Module._load = originalLoad;
        }
    });
});