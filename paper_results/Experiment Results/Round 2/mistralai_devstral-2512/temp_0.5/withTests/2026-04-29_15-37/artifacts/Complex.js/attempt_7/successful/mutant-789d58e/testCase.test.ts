// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-789d58e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.expm1", () => {
  it("should correctly compute expm1 for a complex number with small imaginary part", () => {
    const z = new Complex(0, 0.1);
    const result = z.expm1();
    // The mutation changes the Taylor series coefficient in cosm1 from -1/3628800 to -1*3628800
    // This affects the calculation when the imaginary part is small
    // We'll check the real part which uses cosm1(b)
    // The correct value should be close to Math.cos(0.1) - 1
    const expectedRe = Math.cos(0.1) - 1;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(Math.sin(0.1), 10);
  });
});