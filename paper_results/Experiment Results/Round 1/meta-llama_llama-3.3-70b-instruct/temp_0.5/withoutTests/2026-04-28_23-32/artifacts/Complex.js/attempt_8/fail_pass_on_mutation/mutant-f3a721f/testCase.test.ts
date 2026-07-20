import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const z1 = new Complex(1 + Complex['EPSILON'] / 2, 0);
    const z2 = new Complex(1, 0);
    expect(z1.equals(z2)).toBe(true);
  });
});