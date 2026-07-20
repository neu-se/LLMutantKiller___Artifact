import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 2);
    const c3 = new Complex(3, 4);
    expect(c1.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
    expect(c1.equals(c1)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
  });
});