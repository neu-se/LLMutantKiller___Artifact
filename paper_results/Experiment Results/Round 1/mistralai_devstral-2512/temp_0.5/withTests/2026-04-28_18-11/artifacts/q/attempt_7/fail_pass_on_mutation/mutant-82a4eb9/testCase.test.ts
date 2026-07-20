// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should correctly detect CommonJS environment with both exports and module", () => {
    // This test targets the specific mutation that changes the condition
    // from `typeof exports === "object" && typeof module === "object"`
    // to `typeof exports === "object" || typeof module === "object"`

    // Verify that Q was properly exported in the current environment
    expect(q).toBeDefined();
    expect(typeof q).toBe('function');

    // Test that Q works correctly
    return q.resolve(42).then((value: number) => {
      expect(value).toBe(42);

      // Now test the specific behavior that differs between original and mutated code
      // We'll check if Q is available in the global scope (which should happen in non-CommonJS environments)
      // In the original code, if both exports and module are objects, Q should be exported via module.exports
      // In the mutated code, if only one is an object, it might incorrectly export to global
      if (typeof window !== 'undefined') {
        // In browser environment, Q should be available globally
        expect(window.Q).toBeDefined();
      } else {
        // In Node.js, Q should be available via require but not necessarily global
        // The mutation might cause incorrect global exposure
        expect(global.Q).toBeUndefined();
      }
    });
  });
});