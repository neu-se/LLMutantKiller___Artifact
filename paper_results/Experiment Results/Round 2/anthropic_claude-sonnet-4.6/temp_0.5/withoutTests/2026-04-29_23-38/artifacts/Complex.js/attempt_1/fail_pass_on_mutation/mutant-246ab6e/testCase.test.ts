import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh function behavior", () => {
  it("should correctly compute cosh for a complex number with non-trivial imaginary part using correct cosh formula", () => {
    // The mutation changes (Math.exp(x) + Math.exp(-x)) * 0.5 to (Math.exp(x) + Math.exp(+x)) * 0.5
    // This means cosh(x) becomes Math.exp(x) instead of (Math.exp(x) + Math.exp(-x)) / 2 for |x| >= 1e-9
    // We can detect this by computing cosh of a real number where the difference is observable
    // cosh(1) = (e + 1/e) / 2 ≈ 1.5430806348152437
    // mutated: (e + e) / 2 = e ≈ 2.718281828459045
    
    // Use the sin method which calls cosh internally: sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For z = i (a=0, b=1): sin(i) = sin(0)*cosh(1) + i*cos(0)*sinh(1) = 0 + i*sinh(1)
    // The real part should be 0, imaginary part should be sinh(1)
    
    // Better: use cosh method directly: cosh(a + bi) = cosh(a)*cos(b) + i*sinh(a)*sin(b)
    // For z = 1 (a=1, b=0): cosh(1) = cosh(1)*cos(0) + i*sinh(1)*sin(0) = cosh(1) + 0i
    // Original: cosh(1) ≈ 1.5430806348152437
    // Mutated: (e^1 + e^1)/2 = e ≈ 2.718281828459045
    
    const z = new Complex(1, 0);
    const result = z.cosh();
    
    // Original cosh(1) = (e + 1/e) / 2
    const expected = (Math.exp(1) + Math.exp(-1)) * 0.5;
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});