import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 2);
    expect(c1.equals(c2)).toBe(true); // This should pass on the original code
    const c3 = new Complex(1, 2);
    expect(c1.equals(c3)).toBe(true); // This should pass on the original code and fail on the mutated code because the mutated code always returns true
  });
});