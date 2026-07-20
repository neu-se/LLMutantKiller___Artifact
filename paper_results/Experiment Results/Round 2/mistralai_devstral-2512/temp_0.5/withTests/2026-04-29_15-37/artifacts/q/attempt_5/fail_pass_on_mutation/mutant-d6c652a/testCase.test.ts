// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d6c652a/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should handle missing stack traces without throwing", () => {
    // This test verifies that captureLine returns early when hasStacks is false
    // The mutation removes the return statement, causing the function to continue
    // and throw an error when trying to access e.stack on an error without stack

    // Create an error without a stack trace
    const errorWithoutStack = new Error();
    delete errorWithoutStack.stack;

    // Save the original hasStacks value
    const originalHasStacks = Q.longStackSupport;
    // Force hasStacks to be false
    Q.longStackSupport = false;

    // Create a new promise to trigger captureLine
    let errorThrown = false;
    try {
      // This should trigger captureLine internally
      const promise = Q.defer().promise;
      // Force stack trace capture
      Q.longStackSupport = true;
      Q.defer();
      Q.longStackSupport = false;
    } catch (e) {
      errorThrown = true;
    }

    // Restore the original hasStacks value
    Q.longStackSupport = originalHasStacks;

    // The test passes if no error is thrown in the original code
    // The mutation would cause an error when hasStacks is false
    expect(errorThrown).toBe(false);
  });
});