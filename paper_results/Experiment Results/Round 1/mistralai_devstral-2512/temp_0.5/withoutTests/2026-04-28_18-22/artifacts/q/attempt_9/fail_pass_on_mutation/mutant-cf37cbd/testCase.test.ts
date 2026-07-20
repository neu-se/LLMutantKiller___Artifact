// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a mock error with a stack trace containing multi-digit column numbers
    const error = new Error("Test error");
    error.stack = `Error: Test error
    at Test.test (file.js:100:123)
    at anotherFunction (file.js:200:456)`;

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a rejected promise with this error
    const promise = Q.reject(error);

    return promise.catch((caughtError: Error) => {
      // The error should be properly handled
      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError.message).toBe("Test error");

      // The stack trace should be properly parsed and formatted
      // The mutation would cause issues with parsing column numbers > 9
      if (caughtError.stack) {
        // Check that the stack trace contains the expected lines
        expect(caughtError.stack).toContain("file.js:100:123");
        expect(caughtError.stack).toContain("file.js:200:456");

        // The mutation would fail to properly parse these lines
        // because it changes (?:\d+) to (?:\d) which only matches single digits
        // This would cause the stack trace filtering to behave differently
        const lines = caughtError.stack.split('\n');
        const hasProperFormatting = lines.some(line =>
          /file\.js:\d+:\d{3}/.test(line)  // Specifically check for 3-digit columns
        );
        expect(hasProperFormatting).toBe(true);

        // Additionally, verify that the stack trace was properly filtered
        // The mutation would affect the filtering of internal Q frames
        const hasInternalFrames = lines.some(line =>
          line.includes("q.js") || line.includes("q.js:")
        );
        expect(hasInternalFrames).toBe(false);
      }

      return "recovered";
    });
  });
});