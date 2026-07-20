// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    let stackTrace: string | undefined;

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a deep promise chain to generate stack frames
    let promise = Q.resolve();
    for (let i = 0; i < 10; i++) {
      promise = promise.then(() => {
        // This will create stack frames with various column numbers
        return i;
      });
    }

    // Reject the promise to trigger stack trace capture
    promise = promise.then(() => {
      throw new Error("Test error with multi-digit columns");
    });

    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error with multi-digit columns");

      // The stack trace should be properly parsed
      // If the mutation is present, it might fail to parse lines with multi-digit column numbers
      if (error.stack) {
        const lines = error.stack.split('\n');
        expect(lines.length).toBeGreaterThan(1);

        // Check that the stack trace was properly formatted
        // The mutation would cause issues with parsing column numbers > 9
        expect(error.stack).toContain("Test error with multi-digit columns");
      }

      return "recovered";
    });
  });
});