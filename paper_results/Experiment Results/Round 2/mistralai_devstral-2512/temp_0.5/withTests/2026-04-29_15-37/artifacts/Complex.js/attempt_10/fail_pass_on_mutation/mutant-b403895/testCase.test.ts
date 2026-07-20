// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b403895/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct result for complex number with zero real and non-zero imaginary", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(1.5707963267948966);
    expect(result.im).toBeCloseTo(0.8813735870195429);
  });
});