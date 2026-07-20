// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/spacl-core/attempt_1/pending_category/mutant-82dff14/testCase.test.ts
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter validation", () => {
  it("should reject empty version parameter", () => {
    // This test will pass with original code (which doesn't allow empty string)
    // but fail with mutated code (which defaults to empty string)
    const validPath = "/test/path";
    expect(() => {
      new Matcher(validPath, "" as any);
    }).toThrow();
  });
});