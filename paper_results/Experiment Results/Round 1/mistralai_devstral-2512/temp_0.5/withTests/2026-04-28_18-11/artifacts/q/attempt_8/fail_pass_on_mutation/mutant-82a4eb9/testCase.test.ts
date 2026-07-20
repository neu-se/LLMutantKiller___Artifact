// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should correctly handle module exports in CommonJS environment", () => {
    // This test targets the specific mutation that changes the condition
    // from `typeof exports === "object" && typeof module === "object"`
    // to `typeof exports === "object" || typeof module === "object"`

    // Verify Q is properly exported
    expect(q).toBeDefined();
    expect(typeof q).toBe('function');

    // Test basic functionality
    return q.resolve(42).then((value: number) => {
      expect(value).toBe(42);

      // The key difference: in the original code, Q should be exported via module.exports
      // In the mutated code, it might be exported incorrectly when only one condition is met
      // We'll check if Q is available as a global when it shouldn't be
      if (typeof global !== 'undefined') {
        // In Node.js, Q should not be available as a global variable
        // The mutation might cause it to be exposed globally
        expect(global.Q).toBeUndefined();
      }
    });
  });
});