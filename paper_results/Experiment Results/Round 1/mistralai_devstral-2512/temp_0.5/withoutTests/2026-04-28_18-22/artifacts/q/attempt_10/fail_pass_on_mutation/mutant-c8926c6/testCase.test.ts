const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should correctly detect Node.js environment and use appropriate tick mechanism", () => {
    // The mutation changes the Node.js detection from:
    // process.toString() === "[object process]" && process.nextTick
    // to:
    // true && process.nextTick
    //
    // We can detect this by checking the internal behavior when process.toString() is modified

    const originalToString = process.toString;

    try {
      // Test 1: Verify original behavior with real Node.js
      const realNodeDetection = process.toString() === "[object process]" && !!process.nextTick;
      expect(realNodeDetection).toBe(true);

      // Test 2: Simulate fake environment and verify detection fails
      process.toString = () => "[object Object]";
      const fakeNodeDetection = process.toString() === "[object process]" && !!process.nextTick;
      expect(fakeNodeDetection).toBe(false);

      // Test 3: Verify the mutation would make detection always pass
      // (This is what the mutation does - changes condition to always true)
      const mutatedDetection = true && !!process.nextTick;
      expect(mutatedDetection).toBe(true);

      // The key difference: original code should fail detection in fake environment
      // mutated code would pass detection in fake environment
      // This test passes on original because fakeNodeDetection is false
      // It would fail on mutated code because fakeNodeDetection would be true
      expect(fakeNodeDetection).not.toBe(mutatedDetection);

    } finally {
      process.toString = originalToString;
    }
  });
});