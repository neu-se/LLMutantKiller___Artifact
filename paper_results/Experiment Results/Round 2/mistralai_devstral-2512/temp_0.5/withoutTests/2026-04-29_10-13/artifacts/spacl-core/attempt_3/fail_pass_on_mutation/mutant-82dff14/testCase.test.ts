// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/spacl-core/attempt_1/pending_category/mutant-82dff14/testCase.test.ts
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher default version parameter", () => {
  it("should use version 1.1 when no version specified", () => {
    // This test will pass with original code (default '1.1')
    // but fail with mutated code (default "") because empty string
    // will cause different wildcard validation behavior
    const pathWithPlus = "/test/+/file";
    expect(() => {
      Matcher.for(pathWithPlus);
    }).not.toThrow();
  });
});