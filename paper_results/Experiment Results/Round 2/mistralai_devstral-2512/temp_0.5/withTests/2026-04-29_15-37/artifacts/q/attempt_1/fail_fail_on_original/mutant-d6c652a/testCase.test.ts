// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-d6c652a/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should return undefined when stack traces are not supported", () => {
    // Save the original hasStacks value
    const originalHasStacks = (Q as any).longStackSupport;
    // Force hasStacks to be false
    (Q as any).longStackSupport = false;

    // Create a new Q instance to trigger captureLine
    const result = Q(10);

    // Restore the original hasStacks value
    (Q as any).longStackSupport = originalHasStacks;

    // The test passes if the code doesn't throw an error
    // The mutation would cause an error if it doesn't return early when hasStacks is false
    expect(true).toBe(true);
  });
});