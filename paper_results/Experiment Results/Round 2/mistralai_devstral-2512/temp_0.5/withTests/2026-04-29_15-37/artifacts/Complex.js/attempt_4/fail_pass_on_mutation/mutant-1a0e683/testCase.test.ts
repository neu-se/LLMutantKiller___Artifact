// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1a0e683/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should handle zero base with positive real exponent and zero imaginary exponent correctly", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(2, 0);
    const result = base.pow(exponent);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});