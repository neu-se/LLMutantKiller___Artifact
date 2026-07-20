import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0);
    expect(complex1.equals(complex2)).toBe(true);
    const complex3 = new Complex(1.0, 1.0);
    const complex4 = new Complex(1.0, 1.0 + (Complex['EPSILON'] + 0.000001));
    expect(complex3.equals(complex4)).toBe(false); // This line should pass on both the original and mutated code
  });
});