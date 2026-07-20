// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values at the threshold boundary", () => {
    const z1 = new Complex(0.9e-9, 0); // Just below threshold
    const z2 = new Complex(1.1e-9, 0); // Just above threshold
    const result1 = z1.cosh();
    const result2 = z2.cosh();

    // For values below threshold, should use Taylor approximation (1 - x)
    // For values above threshold, should use exponential formula
    expect(result1.re).toBeCloseTo(1 - 0.9e-9, 12);
    expect(result2.re).toBeGreaterThan(1 - 1.1e-9);
    expect(result2.re).toBeLessThan(1.000000000002);
    expect(result1.im).toBeCloseTo(0, 12);
    expect(result2.im).toBeCloseTo(0, 12);
  });
});