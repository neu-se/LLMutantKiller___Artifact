import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex equals method', () => {
  it('should return true when imaginary difference equals exactly EPSILON', () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, epsilon);
    
    // The original uses <=, so when difference === EPSILON, it should return true
    // The mutated version uses <, so when difference === EPSILON, it returns false
    expect(c1.equals(c2)).toBe(true);
  });
});