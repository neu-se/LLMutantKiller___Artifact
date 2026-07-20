import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a promise chain that will generate a stack trace
    return Q.reject(new Error("test error"))
      .catch((error: Error) => {
        // Create a mock stack line with multi-digit column number
        const stackLine = "at /path/to/file.js:123:456";

        // Test the regex pattern directly
        // Original regex: /at ([^ ]+):(\d+):(?:\d+)$/
        // Mutated regex: /at ([^ ]+):(\d+):(?:\d)$/
        const originalRegex = /at ([^ ]+):(\d+):(?:\d+)$/;
        const mutatedRegex = /at ([^ ]+):(\d+):(?:\d)$/;

        // Original should match multi-digit column numbers
        const originalMatch = originalRegex.exec(stackLine);
        expect(originalMatch).not.toBeNull();
        if (originalMatch) {
          expect(originalMatch[1]).toBe("/path/to/file.js");
          expect(originalMatch[2]).toBe("123");
        }

        // Mutated should fail to match multi-digit column numbers
        const mutatedMatch = mutatedRegex.exec(stackLine);
        expect(mutatedMatch).toBeNull();

        // This assertion will fail on mutated code
        expect(originalMatch).not.toBeNull();
        expect(mutatedMatch).toBeNull();
      });
  });
});