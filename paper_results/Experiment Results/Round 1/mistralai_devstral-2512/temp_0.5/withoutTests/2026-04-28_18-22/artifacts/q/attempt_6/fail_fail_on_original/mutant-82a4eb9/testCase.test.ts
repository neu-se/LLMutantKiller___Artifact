// Test case to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
    it("should only export Q when both exports and module are objects (AND condition)", () => {
        // This test specifically targets the mutation that changes the condition
        // from "exports === 'object' && module === 'object'" to OR
        // We need to test in an environment where only module is an object

        // Create a mock environment where only module is an object
        const mockExports = null;
        const mockModule = { id: 'test', exports: {} };

        // Store original values
        const originalExports = global.exports;
        const originalModule = global.module;

        // Set up the test environment
        global.exports = mockExports;
        global.module = mockModule;

        // Clear the require cache to force re-evaluation
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

        // Try to require Q in this environment
        let qInMockEnv;
        try {
            qInMockEnv = require("../../../../../../../../../../../subject_repositories/q/q.js");
        } catch (e) {
            // Expected to fail in original code, but might succeed in mutated code
        }

        // Restore original values
        global.exports = originalExports;
        global.module = originalModule;

        // In original code (AND condition), Q should NOT be exported when only module is an object
        // In mutated code (OR condition), Q might be exported
        expect(qInMockEnv).toBeUndefined();

        // Now test the normal case where both are objects
        const normalQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(normalQ).toBeDefined();
        expect(typeof normalQ.defer).toBe("function");
    });
});