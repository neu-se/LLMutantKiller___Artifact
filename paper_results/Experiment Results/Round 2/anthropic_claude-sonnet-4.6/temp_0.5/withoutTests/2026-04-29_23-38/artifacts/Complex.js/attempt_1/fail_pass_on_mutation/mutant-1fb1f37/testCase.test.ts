import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh behavior for small values', () => {
  it('should correctly compute sin with small imaginary part using cosh approximation', () => {
    // For sin(0 + i*b) = sin(0)*cosh(b) + i*cos(0)*sinh(b) = 0 + i*sinh(b)
    // For sin(pi/2 + i*b) = sin(pi/2)*cosh(b) + i*cos(pi/2)*sinh(b) = cosh(b) + 0
    // With b = 1e-10, original cosh(b) = 1 - 1e-10 = 0.9999999999
    // With mutated cosh(b) = (exp(1e-10) + exp(-1e-10))/2 ≈ 1.000000000005e-20 + 1 ≈ 1
    const b = 1e-10;
    const c = new Complex(Math.PI / 2, b);
    const result = c.sin();
    // Original: re = sin(pi/2) * cosh(1e-10) = 1 * (1 - 1e-10) = 0.9999999999
    // Mutated: re = sin(pi/2) * (exp(1e-10)+exp(-1e-10))/2 ≈ 1.000000000005
    expect(result.re).toBeCloseTo(1 - b, 9);
  });
});