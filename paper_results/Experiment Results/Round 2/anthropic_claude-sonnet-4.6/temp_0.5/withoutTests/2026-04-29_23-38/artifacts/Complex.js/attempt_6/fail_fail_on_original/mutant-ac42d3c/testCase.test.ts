import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should handle atan of pure imaginary number less than -1', () => {
    // Test atan(0 - 2i): a=0, b=-2 (not the special case)
    // atan(0-2i) = i/2 * log((i + 0-2i)/(i - 0+2i)) = i/2 * log(-i/3i) = i/2 * log(-1/3)
    // = i/2 * (ln(1/3) + i*pi) = -pi/2 + i/2 * ln(1/3)
    const c = new Complex(0, -2);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
  });
});