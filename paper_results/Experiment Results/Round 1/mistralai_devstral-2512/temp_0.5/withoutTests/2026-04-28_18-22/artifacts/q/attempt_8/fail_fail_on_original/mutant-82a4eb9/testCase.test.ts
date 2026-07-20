// Test case to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
    it("should only export Q when both exports and module are objects (AND condition)", () => {
        // This test specifically targets the mutation that changes the condition
        // from "exports === 'object' && module === 'object'" to OR
        // We need to test in an environment where only one is an object

        // Create a mock environment where only exports is an object
        const mockExports = {};
        const mockModule = undefined;

        // Store original values
        const originalExports = global.exports;
        const originalModule = global.module;

        // Set up the test environment
        (global as any).exports = mockExports;
        (global as any).module = mockModule;

        // Clear the require cache to force re-evaluation
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

        // Try to require Q in this environment
        let qInMockEnv;
        let requireError = null;
        try {
            qInMockEnv = require("../../../../../../../../../../../subject_repositories/q/q.js");
        } catch (e) {
            requireError = e;
        }

        // Restore original values
        (global as any).exports = originalExports;
        (global as any).module = originalModule;

        // In original code (AND condition), Q should NOT be exported when only exports is an object
        // In mutated code (OR condition), Q might be exported
        // The original code should throw an error in this case
        expect(requireError).not.toBeNull();
        expect(requireError.message).toContain("This environment was not anticipated by Q");

        // Now test the normal case where both are objects
        const normalQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(normalQ).toBeDefined();
        expect(typeof normalQ.defer).toBe("function");
    });
});