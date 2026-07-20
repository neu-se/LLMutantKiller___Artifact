// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should fail when exports is not an object in CommonJS environment", () => {
    // This test verifies the mutation by checking if the exports check is working correctly
    // The original code checks `typeof exports === "object" && typeof module === "object"`
    // The mutation changes it to `true && typeof module === "object"`

    // First verify Q works normally
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Now test the critical difference - we'll temporarily make exports not an object
    const originalExports = exports;
    exports = null;

    try {
      // Clear the require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // This should fail in original code but pass in mutated code
      const QWithoutExports = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // If we get here, the mutation is present (condition changed to just "true")
      // In original code, this would throw "This environment was not anticipated by Q"
      expect(QWithoutExports).toBeDefined();
      fail("Should have thrown error in original code");
    } catch (error: any) {
      // Expected in original code
      expect(error.message).toContain("This environment was not anticipated by Q");
    } finally {
      // Restore exports
      exports = originalExports;
    }
  });
});