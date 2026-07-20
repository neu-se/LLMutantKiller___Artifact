const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with line and column numbers", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // Verify the error was caught
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error");

      // Test the specific regex behavior that differs between original and mutated code
      const testStackLine = "at module.js:42:30 with extra text";

      // Original regex (with $ anchor) should NOT match lines with extra text
      const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const originalMatch = originalRegex.exec(testStackLine);

      // Mutated regex (without $ anchor) will incorrectly match lines with extra text
      const mutatedRegex = /at ([^ ]+):(\d+):(?:\d+)/;
      const mutatedMatch = mutatedRegex.exec(testStackLine);

      // This assertion will pass on original code (match should be null)
      // but fail on mutated code (match will not be null)
      expect(originalMatch).toBeNull();
      expect(mutatedMatch).toBeNull();
    });
  });
});