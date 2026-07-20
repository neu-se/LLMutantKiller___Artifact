// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5e4ae2a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle real numbers greater than 1 by negating the imaginary part", () => {
    const result = new Complex(2, 0).atanh();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
  });
});