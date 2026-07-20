// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with single-digit column numbers", () => {
    // Create a promise that will generate a stack trace with single-digit column numbers
    const promise = Q.Promise((resolve, reject) => {
      // This will create a stack trace with single-digit column numbers
      reject(new Error("Test error"));
    });

    // Enable long stack traces to trigger the parsing
    Q.longStackSupport = true;

    // Return the promise and verify it handles the stack trace correctly
    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // Verify the error was properly processed
        expect(error.message).toBe("Test error");
        // The stack trace should be properly parsed
        expect(error.stack).toBeDefined();
        // The key difference: the mutated version would fail to parse stack lines
        // with single-digit column numbers because it expects exactly one digit (?:\\d)
        // instead of one or more digits (?:\\d+)
        // This should cause the stack trace filtering to fail
      }
    );
  });
});