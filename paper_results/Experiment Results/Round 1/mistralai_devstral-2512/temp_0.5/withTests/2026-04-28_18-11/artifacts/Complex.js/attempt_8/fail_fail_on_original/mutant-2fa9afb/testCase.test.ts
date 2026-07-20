// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return correct result for non-zero imaginary component", () => {
    const c = new Complex(0, Math.PI/2);
    const result = c.sinh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.sinh(Math.PI/2));
  });
});