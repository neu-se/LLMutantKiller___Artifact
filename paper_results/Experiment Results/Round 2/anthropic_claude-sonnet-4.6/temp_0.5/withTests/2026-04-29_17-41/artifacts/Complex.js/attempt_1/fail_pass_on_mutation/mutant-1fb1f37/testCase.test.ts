import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh fallback behavior', () => {
  it('sin of complex number with small imaginary part uses correct cosh approximation', () => {
    // sin(0 + 0i) = sin(0)*cosh(0) + i*cos(0)*sinh(0) = 0
    // For real numbers, sin(x) should equal Math.sin(x)
    const c = new Complex(Math.PI / 6, 0);
    const result = c.sin();
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});