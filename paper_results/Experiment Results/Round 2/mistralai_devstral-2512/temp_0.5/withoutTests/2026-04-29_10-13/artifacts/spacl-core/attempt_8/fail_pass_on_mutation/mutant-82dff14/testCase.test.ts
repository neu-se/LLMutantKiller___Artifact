// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/spacl-core/attempt_1/pending_category/mutant-82dff14/testCase.test.ts
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter behavior", () => {
  it("should use version 1.1 as default when not specified", () => {
    // This test will pass with original code (default '1.1')
    // but fail with mutated code (default "") because empty string
    // will be treated as version '1' and reject this valid pattern
    const pathWithDoubleWildcard = "/test/**/file";
    const matcher = Matcher.for(pathWithDoubleWildcard);
    expect(matcher).toBeInstanceOf(Matcher);
  });
});