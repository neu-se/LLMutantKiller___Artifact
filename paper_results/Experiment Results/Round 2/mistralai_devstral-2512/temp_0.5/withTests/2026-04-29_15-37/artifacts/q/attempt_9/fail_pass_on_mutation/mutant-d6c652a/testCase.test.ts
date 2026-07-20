// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d6c652a/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should return early when hasStacks is false", () => {
    // This test verifies that captureLine returns early when hasStacks is false
    // The mutation removes the return statement, which would cause the function to continue
    // and throw an error when trying to access e.stack

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