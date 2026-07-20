// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/spacl-core/attempt_1/pending_category/mutant-82dff14/testCase.test.ts
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher constructor default version parameter", () => {
  it("should use version '1.1' as default when not specified", () => {
    // This test will pass with original code (default '1.1') but fail with mutated code (default "")
    // because the mutated version will throw an error for paths containing wildcards
    // that are valid in version '1.1' but not in version '1' or empty string

    // Test a path with '*' wildcard which is valid in version '1.1' but not in version '1'
    const pathWithStar = "/test/*/file";
    expect(() => {
      const matcher = Matcher.for(pathWithStar);
      // If we get here, the matcher was created successfully with default version '1.1'
    }).not.toThrow();
  });
});