import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex equals method', () => {
  it('should return true when the difference between real parts equals exactly EPSILON', () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    
    // Create two complex numbers where re difference is exactly epsilon
    const c1 = new Complex(0, 0);
    const c2 = new Complex(epsilon, 0);
    
    // c2.re - c1.re = epsilon, so Math.abs(z['re'] - this['re']) = epsilon
    // With <=: epsilon <= epsilon => true (original)
    // With <:  epsilon < epsilon  => false (mutant)
    expect(c2.equals(c1)).toBe(true);
  });
});