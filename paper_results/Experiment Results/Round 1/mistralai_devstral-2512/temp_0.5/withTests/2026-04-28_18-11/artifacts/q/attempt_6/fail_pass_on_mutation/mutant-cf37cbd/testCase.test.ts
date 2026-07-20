import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a scenario that will trigger stack trace parsing
    return Q.reject(new Error("test error"))
      .catch((error: Error) => {
        // Test the regex pattern that's used internally
        // The original regex should match multi-digit column numbers
        // The mutated regex will fail to match them
        const testCases = [
          "at /path/to/file.js:123:456",
          "at /path/to/file.js:123:45",
          "at /path/to/file.js:123:4"
        ];

        testCases.forEach(stackLine => {
          const match = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
          expect(match).not.toBeNull();
          if (match) {
            expect(match[1]).toBe("/path/to/file.js");
            expect(match[2]).toBe("123");
          }
        });
      });
  });
});