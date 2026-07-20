// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5a40200/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for small values near zero", () => {
    const z = new Complex(0.000000001, 0); // Very small real value
    const result = z.cosh();
    // For x ≈ 0, cosh(x) ≈ 1 + x²/2
    // The original implementation uses the Taylor approximation for small x
    // The mutated version incorrectly uses the exponential formula for small x
    expect(result.re).toBeCloseTo(1 + (0.000000001 * 0.000000001) / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});