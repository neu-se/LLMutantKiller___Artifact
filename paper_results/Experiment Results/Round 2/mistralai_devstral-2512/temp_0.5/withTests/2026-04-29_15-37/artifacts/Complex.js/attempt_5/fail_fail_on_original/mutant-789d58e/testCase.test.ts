// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-789d58e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.expm1", () => {
  it("should correctly compute expm1 for a complex number with small imaginary part", () => {
    const z = new Complex(0, 0.001);
    const result = z.expm1();
    // The mutation changes the Taylor series coefficient in cosm1 from -1/3628800 to -1*3628800
    // This affects the calculation when the imaginary part is small
    // For small imaginary values, cosm1(im) should be very close to -im^2/2 + im^4/24
    const expectedRe = -5e-7; // - (0.001)^2 / 2
    const expectedIm = 0.0010000001666666667; // 0.001 + (0.001)^3 / 6
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});