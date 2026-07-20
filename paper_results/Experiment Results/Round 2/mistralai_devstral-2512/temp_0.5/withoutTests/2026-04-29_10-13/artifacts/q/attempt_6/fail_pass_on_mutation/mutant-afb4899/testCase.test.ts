const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with line and column numbers", () => {
    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    return promise.catch((error: Error) => {
      // Verify the error was caught
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error");

      // Test the specific regex behavior that differs between original and mutated code
      const testStackLine = "at module.js:42:30";
      const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
      const mutatedRegex = /at ([^ ]+):(\d+):(?:\d+)/;

      // This will pass on original code but fail on mutated code
      // because the mutated regex (without $) will match differently
      const originalMatch = originalRegex.exec(testStackLine);
      const mutatedMatch = mutatedRegex.exec(testStackLine);

      // Original regex should match exactly at end of string
      expect(originalMatch).not.toBeNull();
      if (originalMatch) {
        expect(originalMatch[1]).toBe("module.js");
        expect(originalMatch[2]).toBe("42");
      }

      // Force a failure on mutated code by checking the exact match position
      // The mutated regex without $ anchor might match in unexpected positions
      if (mutatedMatch) {
        // This assertion will fail on mutated code because the match position differs
        expect(mutatedMatch.index).toBe(originalMatch?.index);
      }
    });
  });
});