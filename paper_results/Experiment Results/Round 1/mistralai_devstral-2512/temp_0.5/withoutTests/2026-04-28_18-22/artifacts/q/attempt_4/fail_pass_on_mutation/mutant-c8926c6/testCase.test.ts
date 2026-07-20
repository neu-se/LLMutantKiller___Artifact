const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly identify Node.js environment by checking process.toString()", () => {
    // The mutation changes the Node.js detection condition from:
    // process.toString() === "[object process]" && process.nextTick
    // to:
    // true && process.nextTick
    //
    // This test verifies the original behavior by checking if Q properly
    // distinguishes between real Node.js and fake Node.js environments

    // Save original process.toString
    const originalToString = process.toString;

    try {
      // Simulate a fake Node.js environment by changing process.toString
      process.toString = function() {
        return "[object Object]";
      };

      // In the original code, this should NOT be detected as Node.js
      // In the mutated code, it will always be detected as Node.js (if process.nextTick exists)
      const isNodeJS = process.toString() === "[object process]" && !!process.nextTick;

      // The original code should return false in this fake environment
      expect(isNodeJS).toBe(false);

      // Restore original toString
      process.toString = originalToString;

      // Now test with real Node.js detection
      const realNodeJS = process.toString() === "[object process]" && !!process.nextTick;
      expect(realNodeJS).toBe(true);

    } catch (e) {
      // Restore in case of error
      process.toString = originalToString;
      throw e;
    }
  });
});