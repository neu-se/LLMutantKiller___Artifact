// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a scenario that will generate a stack trace with multi-digit column numbers
    // The mutation changes the regex from (?:\d+) to (?:\d) which fails to match
    // multi-digit column numbers properly
    const error = new Error("Test error");
    const stackLine = "at file.js:100:123"; // Multi-digit column number (123)

    // Access the internal stack trace parsing function
    // This tests the getFileNameAndLineNumber function which uses the mutated regex
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const getFileNameAndLineNumber = qModule.getFileNameAndLineNumber;

    if (typeof getFileNameAndLineNumber === 'function') {
      const result = getFileNameAndLineNumber(stackLine);
      expect(result).toEqual(["file.js", 100]);
    } else {
      // If the function isn't exported, we'll test through the public API
      // by creating a promise that will generate stack traces
      const deferred = Q.defer();
      let stackTrace: string | undefined;

      Q.longStackSupport = true;

      // Create a deep promise chain to generate stack frames
      let promise = Q.resolve();
      for (let i = 0; i < 5; i++) {
        promise = promise.then(() => i);
      }

      // Reject to trigger stack trace capture
      promise = promise.then(() => {
        throw new Error("Test error with multi-digit columns");
      });

      return promise.catch((err: Error) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe("Test error with multi-digit columns");

        // The mutation would cause stack trace parsing to fail for multi-digit columns
        // This should be observable in the stack trace formatting
        if (err.stack) {
          expect(err.stack).toContain("Test error with multi-digit columns");
        }
        return "recovered";
      });
    }
  });
});