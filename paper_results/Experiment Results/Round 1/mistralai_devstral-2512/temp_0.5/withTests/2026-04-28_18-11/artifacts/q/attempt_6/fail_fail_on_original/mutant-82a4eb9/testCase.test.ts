// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should correctly handle module exports when only module is defined", () => {
    // This test targets the specific mutation that changes the condition
    // from `typeof exports === "object" && typeof module === "object"`
    // to `typeof exports === "object" || typeof module === "object"`

    // We'll test this by creating a scenario where only module exists
    // In the original code, this should NOT trigger CommonJS export
    // In the mutated code, this WILL trigger CommonJS export

    // Create a mock environment where only module exists
    const mockModule = { exports: {} };
    const originalExports = global.exports;
    const originalModule = global.module;

    try {
      // Set up the test environment
      global.exports = undefined;
      global.module = mockModule;

      // Clear the require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // Require Q again in this modified environment
      const qInTestEnv = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code: qInTestEnv should NOT be the Q library (should be undefined or something else)
      // In mutated code: qInTestEnv WOULD be the Q library (incorrect behavior)
      expect(qInTestEnv).not.toBe(q);
      expect(typeof qInTestEnv).not.toBe('function');
    } finally {
      // Restore original environment
      global.exports = originalExports;
      global.module = originalModule;
    }
  });
});