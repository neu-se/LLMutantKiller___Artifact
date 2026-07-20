// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-23e5676/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute acsc for non-zero complex numbers", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes division to multiplication in the acsc method
    // For non-zero inputs, this should produce a significantly different result
    // We'll verify the result is a valid complex number with expected properties
    expect(result).toBeInstanceOf(Complex);
    expect(result.isNaN()).toBe(false);
    // The exact values are complex to predict, but we can verify the structure
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    // For the specific case of (2,3), we can compute expected values
    // Expected result should be approximately (0.1476, -0.2214) based on formula
    expect(Math.abs(result.re - 0.1476)).toBeLessThan(0.01);
    expect(Math.abs(result.im - (-0.2214))).toBeLessThan(0.01);
  });
});