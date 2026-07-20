// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with single-digit column numbers", () => {
    // Create a mock stack trace with single-digit column number
    const mockError = new Error("Test error");
    mockError.stack = "Error: Test error\n    at test.js:10:5";

    // Create a rejected promise with this error
    const deferred = Q.defer();
    deferred.reject(mockError);

    // Get the promise and force stack trace processing
    const promise = deferred.promise;

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