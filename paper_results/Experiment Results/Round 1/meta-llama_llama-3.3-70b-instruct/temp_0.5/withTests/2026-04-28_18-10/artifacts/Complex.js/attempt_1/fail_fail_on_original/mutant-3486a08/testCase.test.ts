import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers for equality', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    expect(c1.equals(c2)).toBe(true);
    const c3 = new Complex(1, 2);
    expect(c1.equals(c3)).toBe(false);
  });
});