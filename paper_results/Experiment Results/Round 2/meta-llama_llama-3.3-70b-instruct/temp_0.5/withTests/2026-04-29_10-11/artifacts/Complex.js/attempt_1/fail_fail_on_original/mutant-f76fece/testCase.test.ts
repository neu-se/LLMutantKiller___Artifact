import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1.000000000000001, 1.000000000000001);
    const c2 = new Complex(1, 1);
    expect(c1.equals(c2)).toBe(true);
  });
});