// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should correctly handle module detection logic", () => {
    // This test targets the specific mutation that changes the condition
    // from `typeof exports === "object" && typeof module === "object"`
    // to `typeof exports === "object" || typeof module === "object"`

    // Verify Q is properly exported
    expect(q).toBeDefined();
    expect(typeof q).toBe('function');

    // Test basic functionality
    return q.resolve(42).then((value: number) => {
      expect(value).toBe(42);

      // Check if Q is available as a global (which would be wrong in Node.js)
      // The mutation might cause Q to be exposed globally when it shouldn't be
      if (typeof global !== 'undefined' && typeof global.Q !== 'undefined') {
        // If Q is globally available in Node.js, this indicates the mutation is present
        // because the original code should only export via module.exports
        fail("Q should not be available as a global variable in Node.js environment");
      }
    });
  });
});