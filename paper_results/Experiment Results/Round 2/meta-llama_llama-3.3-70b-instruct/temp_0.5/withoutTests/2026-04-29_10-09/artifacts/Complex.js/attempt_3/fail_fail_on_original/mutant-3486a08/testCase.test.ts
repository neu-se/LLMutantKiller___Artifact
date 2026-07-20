import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, 0);
    const c3 = new Complex(2, 0);
    expect(c1.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
    expect(c1.equals(c1)).toBe(true);
    expect(c2.equals(c2)).toBe(true);
    expect(c3.equals(c3)).toBe(true);
  });
});