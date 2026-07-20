import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan mutation detection', () => {
  it('should return correct finite atan for purely imaginary number 2i', () => {
    // atan(0 + 2i): b=2, not 1, so original skips the special case
    // With mutation if(true), the special case always fires returning wrong result
    const z = new Complex(0, 2);
    const result = z.atan();
    // atan(2i) = i * atanh(2) = i * 0.5 * ln(3) ≈ i * 0.5493...
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.log(3) / 2, 10);
  });
});