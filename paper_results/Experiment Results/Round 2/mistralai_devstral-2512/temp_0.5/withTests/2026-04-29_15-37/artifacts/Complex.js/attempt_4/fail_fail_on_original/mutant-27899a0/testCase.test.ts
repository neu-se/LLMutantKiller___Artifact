// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-27899a0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should handle the case where real part is -1 and imaginary part is non-zero", () => {
    const c = new Complex(-1, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(-0.5493, 4);
    expect(result.im).toBeCloseTo(0.5236, 4);
  });
});