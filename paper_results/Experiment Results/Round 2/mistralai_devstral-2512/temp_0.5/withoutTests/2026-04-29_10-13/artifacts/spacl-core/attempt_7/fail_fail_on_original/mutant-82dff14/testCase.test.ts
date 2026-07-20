// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/spacl-core/attempt_1/pending_category/mutant-82dff14/testCase.test.ts
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter validation", () => {
  it("should reject invalid wildcard patterns in version 1.0", () => {
    // This test will pass with original code (default '1.1')
    // but fail with mutated code (default "") because empty string
    // will be treated as version '1.0' and reject this pattern
    const pathWithPlus = "/test/+/file";
    expect(() => {
      Matcher.for(pathWithPlus, '1.0');
    }).toThrow('Path contains malformed wildcards');
  });
});