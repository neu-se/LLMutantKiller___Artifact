// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should fail when exports object is not available in CommonJS environment", () => {
    // This test verifies the mutation by checking if Q still works when exports is undefined
    // The original code requires exports to be an object, while the mutation makes it work regardless

    // First verify Q works normally
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Now test the critical difference - simulate an environment without exports
    // We'll delete the exports reference to test the mutation
    const originalExports = module.exports;
    delete module.exports;

    try {
      // Clear the require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // This should fail in original code but pass in mutated code
      const QWithoutExports = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // If we get here, the mutation is present (condition changed to just "true")
      // In original code, this would throw "This environment was not anticipated by Q"
      expect(QWithoutExports).toBeDefined();
      expect(typeof QWithoutExports).toBe("function");

      // Restore exports
      module.exports = originalExports;
      fail("Should have thrown error in original code");
    } catch (error) {
      // Expected in original code
      expect(error.message).toContain("This environment was not anticipated by Q");

      // Restore exports
      module.exports = originalExports;
    }
  });
});