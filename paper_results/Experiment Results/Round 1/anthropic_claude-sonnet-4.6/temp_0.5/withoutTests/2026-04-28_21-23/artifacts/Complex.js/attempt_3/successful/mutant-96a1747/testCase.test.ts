import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return a non-NaN imaginary part for atanh of a real number greater than 1", () => {
    // For a real number a > 1, b === 0: noIM = true
    // Original: x['im'] = -x['im'] (negates the imaginary part, result is finite)
    // Mutated: x['im'] = -x[""] => -undefined => NaN
    const result = new Complex(2, 0).atanh();
    
    // The imaginary part must not be NaN in the original code
    expect(isNaN(result.im)).toBe(false);
    // The imaginary part should be -pi/2 (as observed from original behavior)
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    // The real part should be finite
    expect(isNaN(result.re)).toBe(false);
  });
});