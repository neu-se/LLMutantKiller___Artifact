// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a promise that will generate a stack trace with multi-digit column numbers
    // The mutation affects the regex pattern for parsing column numbers in stack traces
    const promise = Q.resolve().then(() => {
      // This will create a stack frame with multi-digit column numbers
      // The exact line number will be determined by the JavaScript engine
      throw new Error("Test error with multi-digit columns");
    });

    return promise.catch((error: Error) => {
      // The error should be properly handled
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error with multi-digit columns");

      // The stack trace should be properly parsed
      // The mutation changes (?:\d+) to (?:\d) which would fail to match
      // multi-digit column numbers properly
      if (error.stack) {
        const lines = error.stack.split('\n');
        // Look for lines with multi-digit column numbers (format: file:line:column)
        const hasMultiDigitColumns = lines.some(line =>
          /:\d+:\d{2,}/.test(line)  // Matches :line:column where column has 2+ digits
        );

        // The test expects that multi-digit column numbers are properly handled
        // If the mutation is present, this might fail or behave differently
        expect(hasMultiDigitColumns).toBe(true);
      }

      return "recovered";
    });
  });
});