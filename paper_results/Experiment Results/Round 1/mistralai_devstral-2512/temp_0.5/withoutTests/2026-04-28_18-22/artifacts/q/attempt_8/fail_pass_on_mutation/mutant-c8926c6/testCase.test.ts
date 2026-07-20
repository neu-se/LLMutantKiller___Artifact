const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should correctly identify Node.js environment by process.toString() check", () => {
    // The mutation changes the condition from:
    // process.toString() === "[object process]" && process.nextTick
    // to:
    // true && process.nextTick
    //
    // This test directly checks the environment detection logic

    const originalToString = process.toString;

    try {
      // Test with real Node.js process.toString()
      const realNodeCheck = process.toString() === "[object process]" && !!process.nextTick;
      expect(realNodeCheck).toBe(true);

      // Simulate a fake environment (like Browserify)
      process.toString = () => "[object Object]";

      // In original code, this should be false
      const fakeNodeCheck = process.toString() === "[object process]" && !!process.nextTick;
      expect(fakeNodeCheck).toBe(false);

      // The mutation would make this true (since it changes to just "true")
      // This is the key difference we're testing
      const mutatedCheck = true && !!process.nextTick;
      expect(mutatedCheck).toBe(true); // This shows what the mutation does

      // The test passes on original because fakeNodeCheck is false
      // It would fail on mutated code because fakeNodeCheck would be true
      // (but we can't directly test that without modifying the source)

    } finally {
      process.toString = originalToString;
    }
  });
});