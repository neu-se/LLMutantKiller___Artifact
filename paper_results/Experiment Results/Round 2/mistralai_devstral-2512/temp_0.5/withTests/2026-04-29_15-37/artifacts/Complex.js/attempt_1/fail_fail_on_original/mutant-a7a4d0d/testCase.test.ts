// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The original code should return a complex number with swapped real and imaginary parts
    // when the imaginary part of the result is <= 0. The mutant always swaps them.
    // For input (1, 1), the correct acosh result should have a positive imaginary part,
    // so the original code should NOT swap them, but the mutant will.
    expect(result.re).toBeCloseTo(0.9624236501192069);
    expect(result.im).toBeCloseTo(1.0612750619050357);
  });
});