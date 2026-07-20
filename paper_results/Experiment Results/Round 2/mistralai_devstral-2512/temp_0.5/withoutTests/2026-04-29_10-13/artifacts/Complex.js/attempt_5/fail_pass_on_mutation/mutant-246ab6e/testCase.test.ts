// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for non-zero values and verify the mathematical identity", () => {
    const z = new Complex(2, 0);
    const result = z.cosh();
    // The original implementation uses Math.exp(x) + Math.exp(-x)
    // The mutated version uses Math.exp(x) + Math.exp(+x) which is equivalent to 2*Math.exp(x)
    // For x=2: correct cosh(2) = (e^2 + e^-2)/2 ≈ 3.7621956910836314
    // Mutated version would give (e^2 + e^2)/2 = e^2 ≈ 7.38905609893065
    // Also verify the identity: cosh(2x) = 2cosh²(x) - 1
    const x = 1;
    const cosh_x = new Complex(x, 0).cosh().re;
    const expected_cosh_2x = 2 * cosh_x * cosh_x - 1;
    expect(result.re).toBeCloseTo(expected_cosh_2x, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});