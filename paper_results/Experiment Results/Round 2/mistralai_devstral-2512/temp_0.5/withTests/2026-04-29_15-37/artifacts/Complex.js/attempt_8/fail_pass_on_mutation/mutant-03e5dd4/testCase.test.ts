// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with whitespace", () => {
  it("should handle newline characters correctly but fail when newline is treated as empty string", () => {
    // This works in original code (newline is handled)
    const withNewline = new Complex("1\n+2i");
    expect(withNewline.re).toBe(1);
    expect(withNewline.im).toBe(2);

    // This will fail in mutated code where '\n' is replaced with ""
    // because "1+2i" would be parsed differently than "1\n+2i"
    const withSpace = new Complex("1 +2i");
    expect(withSpace.re).toBe(1);
    expect(withSpace.im).toBe(2);
  });
});