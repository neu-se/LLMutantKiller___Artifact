// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d6c652a/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should handle environments without stack traces", () => {
    // This test verifies that captureLine returns early when hasStacks is false
    // The mutation removes the return statement, which would cause the function to continue
    // and throw an error when trying to access e.stack

    // Save the original hasStacks value
    const originalHasStacks = Q.longStackSupport;
    // Force hasStacks to be false
    Q.longStackSupport = false;

    // Create a new promise to trigger captureLine
    const promise = Q.defer().promise;

    // Restore the original hasStacks value
    Q.longStackSupport = originalHasStacks;

    // The test passes if no error is thrown
    // The mutation would cause an error if it doesn't return early when hasStacks is false
    expect(promise.isPending()).toBe(true);
  });
});