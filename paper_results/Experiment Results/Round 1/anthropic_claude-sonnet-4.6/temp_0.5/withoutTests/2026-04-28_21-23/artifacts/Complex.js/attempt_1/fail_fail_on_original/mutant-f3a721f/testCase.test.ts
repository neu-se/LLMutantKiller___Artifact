import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex equals method', () => {
  it('should return true when the difference between real parts is exactly EPSILON', () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1 + epsilon, 0);
    
    // The difference is exactly EPSILON, so <= should return true but < should return false
    expect(c1.equals(c2)).toBe(true);
  });
});