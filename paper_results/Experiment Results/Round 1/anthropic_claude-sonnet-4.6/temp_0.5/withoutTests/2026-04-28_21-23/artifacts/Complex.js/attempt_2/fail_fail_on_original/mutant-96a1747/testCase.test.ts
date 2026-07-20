import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a real number greater than 1, with non-NaN imaginary part", () => {
    // For a real number a > 1, b === 0: noIM = true
    // Original: x['im'] = -x['im'] (negates the imaginary part)
    // Mutated: x['im'] = -x[""] => -undefined => NaN
    const result = new Complex(2, 0).atanh();
    
    // The imaginary part should be a finite number (pi/2), not NaN
    expect(isNaN(result.im)).toBe(false);
    expect(isFinite(result.im)).toBe(true);
    // atanh(2) should have im = pi/2
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});