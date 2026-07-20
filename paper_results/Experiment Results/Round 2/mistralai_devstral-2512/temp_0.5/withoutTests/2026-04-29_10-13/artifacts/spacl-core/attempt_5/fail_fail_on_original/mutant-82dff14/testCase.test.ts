// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/spacl-core/attempt_1/pending_category/mutant-82dff14/testCase.test.ts
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter validation", () => {
  it("should throw error for malformed wildcards in version 1 but not in 1.1", () => {
    // This test will pass with original code (default '1.1')
    // but fail with mutated code (default "") because empty string
    // will be treated as version '1' and throw error for this pattern
    const pathWithAdjacentWildcards = "/test/*+/file";
    expect(() => {
      Matcher.for(pathWithAdjacentWildcards);
    }).not.toThrow();
  });
});