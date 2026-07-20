// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should verify cosh(x) - cosh(-x) equals 0 for non-zero values", () => {
    const x = 2.5;
    const z1 = new Complex(x, 0);
    const z2 = new Complex(-x, 0);
    const result1 = z1.cosh();
    const result2 = z2.cosh();
    // cosh is an even function: cosh(x) - cosh(-x) should be 0
    // The mutation breaks this because it changes the formula to (e^x + e^x)/2
    const difference = Math.abs(result1.re - result2.re);
    expect(difference).toBeLessThan(1e-10);
  });
});