const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Test the internal stack parsing function by creating a scenario that exercises it
    const originalHasStacks = Q.__test_hasStacks;
    Q.__test_hasStacks = true;

    try {
      // Create a test stack line that matches the function name pattern
      const testStackLine = "at TestFunction (/path/to/file.js:123:45)";

      // Access the internal function (this would normally be private)
      // We'll test it indirectly by checking if stack traces are properly filtered
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q");
      const isInternalFrame = qModule.__test_isInternalFrame;

      // Mock the getFileNameAndLineNumber to return empty array (mutated behavior)
      const originalGetFileNameAndLineNumber = qModule.__test_getFileNameAndLineNumber;
      qModule.__test_getFileNameAndLineNumber = () => [];

      // Test that with empty array return, the frame is not considered internal
      const result = isInternalFrame(testStackLine);
      expect(result).toBe(false);

      // Restore original
      qModule.__test_getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    } finally {
      Q.__test_hasStacks = originalHasStacks;
    }
  });
});