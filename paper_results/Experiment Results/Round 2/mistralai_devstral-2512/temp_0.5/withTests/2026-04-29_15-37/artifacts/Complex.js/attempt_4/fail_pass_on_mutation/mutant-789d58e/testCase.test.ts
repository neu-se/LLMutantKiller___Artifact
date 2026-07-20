// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-789d58e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.expm1", () => {
  it("should correctly compute expm1 for a complex number with small real part", () => {
    const z = new Complex(0.001, 0);
    const result = z.expm1();
    // The mutation changes the Taylor series coefficient in cosm1 from -1/3628800 to -1*3628800
    // This affects the real part calculation when the imaginary part is 0
    // For small real values, expm1(re) should be very close to re + re^2/2 + re^3/6
    const expectedRe = 0.00100050016670833;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});