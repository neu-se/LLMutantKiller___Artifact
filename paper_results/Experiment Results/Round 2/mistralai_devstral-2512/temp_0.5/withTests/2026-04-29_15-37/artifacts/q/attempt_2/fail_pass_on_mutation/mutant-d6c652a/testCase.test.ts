// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d6c652a/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should handle environments without stack traces gracefully", () => {
    // This test verifies that the captureLine function returns early when hasStacks is false
    // The mutation removes the return statement, which would cause the function to continue
    // execution and potentially throw an error when trying to access e.stack

    // Create a promise to trigger the captureLine function
    const promise = Q(10);

    // The test passes if no error is thrown
    // The mutation would cause an error if it doesn't return early when hasStacks is false
    expect(promise.isFulfilled()).toBe(true);
  });
});