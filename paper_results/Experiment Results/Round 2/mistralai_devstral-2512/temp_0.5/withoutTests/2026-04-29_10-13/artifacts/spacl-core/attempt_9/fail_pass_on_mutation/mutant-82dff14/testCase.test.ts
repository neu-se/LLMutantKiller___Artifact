// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/spacl-core/attempt_1/pending_category/mutant-82dff14/testCase.test.ts
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher default version parameter", () => {
  it("should accept valid wildcard patterns with default version 1.1", () => {
    // This test will pass with original code (default '1.1')
    // but fail with mutated code (default "") because empty string
    // will be treated as version '1' and reject this valid pattern
    const pathWithPlus = "/test/+/file";
    expect(() => {
      const matcher = Matcher.for(pathWithPlus);
      expect(matcher).toBeInstanceOf(Matcher);
    }).not.toThrow();
  });
});