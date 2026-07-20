// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_8/pending_category/mutant-d65a538/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly handle stack trace filtering with long stack support", () => {
    // This test targets the mutation in the captureLine function
    // The mutation changes `return;` to an empty block `{}`
    // We need to test behavior when stack traces are available

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q().then(() => {
      throw new Error("Test error");
    });

    // The test verifies that the promise is properly rejected
    // and that stack trace filtering works correctly
    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        // The key assertion: stack trace should be filtered
        // In the mutated version, this might behave differently
        if (error.stack) {
          expect(error.stack).not.toContain("q.js");
        }
      }
    );
  });
});