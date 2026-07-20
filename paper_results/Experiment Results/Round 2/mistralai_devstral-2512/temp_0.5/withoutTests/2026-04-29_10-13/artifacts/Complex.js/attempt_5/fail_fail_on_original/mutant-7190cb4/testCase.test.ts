// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7190cb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should return correct result for complex number with zero real part and non-zero imaginary part", () => {
    const c = new Complex(0, 2);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.5);
  });
});