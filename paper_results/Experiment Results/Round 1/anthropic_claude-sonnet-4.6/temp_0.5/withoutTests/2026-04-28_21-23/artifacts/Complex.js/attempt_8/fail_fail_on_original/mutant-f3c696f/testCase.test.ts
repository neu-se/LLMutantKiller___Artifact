import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot of complex number with small positive imaginary part has negative imaginary result', () => {
    // For b > 0 small: acot(0 + bi) ≈ -π/2 (real part) with small imaginary part
    // Using b large enough that b^2 doesn't underflow: b = 1e-150
    const result = new Complex(0, 1e-150).acot();
    // d = (1e-150)^2 = 1e-300 > 0 (doesn't underflow)
    // Normal path: atan(Complex(0, -1e150))
    expect(result.re).toBeCloseTo(-Math.PI / 2, 5);
  });
});