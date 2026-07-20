import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex equals method', () => {
  it('should return true when imaginary difference equals exactly EPSILON', () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, epsilon);
    // In original: uses <=, so difference === EPSILON should return true
    // In mutated: uses <, so difference === EPSILON should return false
    expect(c1.equals(c2)).toBe(true);
  });
});