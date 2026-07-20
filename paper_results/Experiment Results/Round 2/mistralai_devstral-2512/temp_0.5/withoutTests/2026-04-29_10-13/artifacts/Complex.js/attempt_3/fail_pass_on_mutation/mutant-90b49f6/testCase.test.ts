// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-90b49f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with equal plus and minus operators", () => {
    // This test case should pass on the original code but fail on the mutated code
    // because the mutation changes the condition from `plus + minus > 0` to `plus - minus > 0`
    // When plus and minus counts are equal (e.g., "1+2-3i"), the original code correctly
    // detects remaining operators (1+1=2>0), while the mutated code would not (1-1=0)
    expect(() => new Complex("1+2-3i+")).toThrow(SyntaxError);
  });
});