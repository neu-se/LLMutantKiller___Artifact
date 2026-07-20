import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh small value approximation', () => {
  it('should use 1-x approximation for cosh when |x| < 1e-9', () => {
    // sin(PI/2 + b*i) real part = sin(PI/2)*cosh(b) ≈ cosh(b)
    // For b = 5e-10 (< 1e-9):
    // Original cosh(5e-10) = 1 - 5e-10 = 0.9999999995
    // Mutated cosh(5e-10) = (exp(5e-10)+exp(-5e-10))/2 ≈ 1.0000000000000001
    // Use tan which involves cosh in denominator: tan(a) = sin(2a)/(cos(2a)+cosh(2b))
    // With a=0, b=5e-10: tan(0 + 5e-10*i) = sinh(2*5e-10)/(cos(0)+cosh(2*5e-10))
    // = sinh(1e-9) / (1 + cosh(1e-9))
    // Original: cosh(1e-9) = 1 - 1e-9, so denominator = 2 - 1e-9
    // Mutated: cosh(1e-9) = (exp(1e-9)+exp(-1e-9))/2 ≈ 1 + 5e-19 ≈ 1, denominator ≈ 2
    const b = 5e-10;
    const c = new Complex(0, b);
    const result = c.tan();
    // im = sinh(2b) / (1 + cosh(2b))
    // Original: cosh(2b) = 1 - 2b (since 2b = 1e-9 which is NOT < 1e-9, boundary!)
    // Let me use b = 1e-10 so 2b = 2e-10 < 1e-9
    // sinh(2e-10) ≈ 2e-10, cosh(2e-10) original = 1 - 2e-10, mutated ≈ 1
    // im_original = 2e-10 / (1 + 1 - 2e-10) = 2e-10 / (2 - 2e-10) ≈ 1e-10
    // im_mutated  = 2e-10 / (1 + 1) = 1e-10
    // Difference too small. Let me try a different approach.
    
    // Actually use sin directly: sin(PI/2 + b*i) = cosh(b) + i*cos(PI/2)*sinh(b)
    // Real part = sin(PI/2) * cosh(b) = cosh(b)
    // For b = 5e-10:
    // original: 1 - 5e-10
    // mutated: ~1
    const b2 = 5e-10;
    const c2 = new Complex(Math.PI / 2, b2);
    const r2 = c2.sin();
    // The real part should be less than 1 in original
    expect(r2.re).toBeLessThan(1 - 1e-10);
  });
});