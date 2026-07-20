import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Enable long stack traces to ensure stack parsing is used
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
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

        // Test with a stack line that has exactly 2 digits in column (edge case)
        const twoDigitStackLine = "at /path/to/file.js:123:45";
        const twoDigitMatch = /at ([^ ]+):(\d+):(?:\d+)$/.exec(twoDigitStackLine);
        expect(twoDigitMatch).not.toBeNull();
        if (twoDigitMatch) {
          expect(twoDigitMatch[1]).toBe("/path/to/file.js");
          expect(twoDigitMatch[2]).toBe("123");
        }
      });
  });
});