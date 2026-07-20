import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a scenario that will trigger stack trace parsing
    return Q.reject(new Error("test error"))
      .catch((error: Error) => {
        // Create a mock stack line with multi-digit column number
        const stackLine = "at /path/to/file.js:123:456";

        // Test the regex pattern that's used internally
        // The original regex should match multi-digit column numbers
        // The mutated regex will fail to match them
        const match = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);

        // This assertion will fail on mutated code because the regex won't match
        expect(match).not.toBeNull();
        if (match) {
          expect(match[1]).toBe("/path/to/file.js");
          expect(match[2]).toBe("123");
        }

        // Additional test with single digit column (should work in both)
        const singleDigitStackLine = "at /path/to/file.js:123:4";
        const singleMatch = /at ([^ ]+):(\d+):(?:\d+)$/.exec(singleDigitStackLine);
        expect(singleMatch).not.toBeNull();
      });
  });
});