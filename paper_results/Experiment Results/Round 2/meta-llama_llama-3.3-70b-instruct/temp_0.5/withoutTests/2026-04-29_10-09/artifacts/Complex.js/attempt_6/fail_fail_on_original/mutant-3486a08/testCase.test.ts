import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, 0);
    const c3 = new Complex(2, 0);
    expect(c1.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
    const c4 = new Complex(1, 1);
    const c5 = new Complex(2, 2);
    expect(c4.equals(c5)).toBe(false);
    // This should pass on the original code and fail on the mutated code
    expect(c4.equals(c5)).toBe(false);
  });
});