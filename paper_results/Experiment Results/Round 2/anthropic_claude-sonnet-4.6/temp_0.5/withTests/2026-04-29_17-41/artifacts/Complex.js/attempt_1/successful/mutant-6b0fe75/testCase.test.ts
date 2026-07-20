import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh behavior through sin function', () => {
  it('should correctly compute sin of a complex number with small imaginary part', () => {
    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For b = 0 (small), cosh(0) should be 1
    // With the mutation: cosh(0) = 1 - 0 = 1 (happens to be correct for b=0)
    // Let's use a value where cosh matters more distinctly
    // sin(0 + 0.5i) = sin(0)*cosh(0.5) + i*cos(0)*sinh(0.5)
    //              = 0 + i*sinh(0.5)
    // But for small b like 1e-10: cosh(1e-10) should be ~1
    // With mutation: cosh(1e-10) = 1 - 1e-10 (wrong!)
    
    // Use a real number with a very small imaginary part
    // sin(pi/2 + 1e-10 * i) = sin(pi/2)*cosh(1e-10) + i*cos(pi/2)*sinh(1e-10)
    // re part = 1 * cosh(1e-10) ≈ 1 (correct) vs 1 - 1e-10 (mutated, wrong)
    
    const c = new Complex(Math.PI / 2, 1e-10);
    const result = c.sin();
    
    // The real part should be sin(pi/2) * cosh(1e-10) ≈ 1.0 (very close to 1)
    // With mutation: sin(pi/2) * (1 - 1e-10) = 1 - 1e-10 ≈ 0.9999999999
    // With original: sin(pi/2) * Math.cosh(1e-10) ≈ 1.000000000000000005 (essentially 1)
    
    // The difference is tiny, let's use a larger imaginary value
    // sin(pi/2 + 0.5i) = cosh(0.5) * sin(pi/2) + i * sinh(0.5) * cos(pi/2)
    // re = cosh(0.5) ≈ 1.1276259652...
    // With mutation (0.5 > 1e-9): uses (exp(0.5) + exp(-0.5)) / 2 = same as Math.cosh(0.5)
    // So for large values, both are the same. The bug is only for |x| < 1e-9.
    
    // For x = 1e-10: Math.cosh(1e-10) = 1.000000000000000005 ≈ 1
    // custom: 1 - 1e-10 = 0.9999999999
    
    // Let's check the real part is approximately 1 (not 1 - 1e-10)
    expect(result.re).toBeCloseTo(1, 10);
  });
});