// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values at the threshold boundary", () => {
    const z1 = new Complex(0.5e-9, 0); // Well below threshold
    const z2 = new Complex(2e-9, 0); // Well above threshold
    const result1 = z1.cosh();
    const result2 = z2.cosh();

    // For values below threshold, should use Taylor approximation (1 - x)
    // For values above threshold, should use exponential formula
    // The key difference is that the original uses < 1e-9 for Taylor, mutated uses >= 1e-9
    expect(result1.re).toBeCloseTo(1 - 0.5e-9, 10);
    expect(result2.re).toBeCloseTo((Math.exp(2e-9) + Math.exp(-2e-9)) * 0.5, 10);
    expect(result1.im).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});