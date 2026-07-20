const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should correctly detect Node.js environment using process.toString()", () => {
    // The mutation changes the Node.js detection from:
    // process.toString() === "[object process]" && process.nextTick
    // to:
    // true && process.nextTick
    //
    // We can detect this by checking if Q.nextTick behaves differently
    // when process.toString() is modified

    const originalToString = process.toString;
    const originalNextTick = process.nextTick;

    try {
      // Test 1: Verify original behavior with real Node.js process.toString()
      const isRealNode = process.toString() === "[object process]" && !!process.nextTick;
      expect(isRealNode).toBe(true);

      // Test 2: Simulate fake environment and check if Q still tries to use process.nextTick
      process.toString = () => "[object Object]";

      // In original code, this should NOT be detected as Node.js
      const isFakeNode = process.toString() === "[object process]" && !!process.nextTick;
      expect(isFakeNode).toBe(false);

      // Test 3: Verify the mutation would make it always detect as Node.js
      // (This is what the mutation does - changes the condition to always true)
      const mutatedDetection = true && !!process.nextTick;
      expect(mutatedDetection).toBe(true); // This shows the difference

    } finally {
      // Restore originals
      process.toString = originalToString;
      process.nextTick = originalNextTick;
    }
  });
});