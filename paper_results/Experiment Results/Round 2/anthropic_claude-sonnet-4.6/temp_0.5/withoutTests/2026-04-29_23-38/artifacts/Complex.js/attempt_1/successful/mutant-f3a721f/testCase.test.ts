import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex equals method', () => {
  it('should return true when the difference between real parts is exactly EPSILON', () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    const c1 = new Complex(0, 0);
    const c2 = new Complex(epsilon, 0);
    // With original code: Math.abs(epsilon - 0) <= epsilon => true
    // With mutated code: Math.abs(epsilon - 0) < epsilon => false (strict less than fails)
    expect(c1.equals(c2)).toBe(true);
  });
});