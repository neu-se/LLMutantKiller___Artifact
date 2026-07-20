// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should verify cosh(x) equals cosh(-x) for non-zero values", () => {
    const x = 0.5;
    const z1 = new Complex(x, 0);
    const z2 = new Complex(-x, 0);
    const result1 = z1.cosh();
    const result2 = z2.cosh();
    // cosh is an even function: cosh(x) = cosh(-x)
    // The mutation breaks this property because it changes the formula
    expect(result1.re).toBeCloseTo(result2.re, 10);
    expect(result1.im).toBeCloseTo(result2.im, 10);
    // Also verify the actual value is correct
    const expected = (Math.exp(x) + Math.exp(-x)) * 0.5;
    expect(result1.re).toBeCloseTo(expected, 10);
  });
});