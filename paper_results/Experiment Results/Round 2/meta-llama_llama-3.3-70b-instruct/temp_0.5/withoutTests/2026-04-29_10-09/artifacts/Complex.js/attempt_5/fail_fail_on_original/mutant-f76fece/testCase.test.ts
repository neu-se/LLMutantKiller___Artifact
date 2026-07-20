import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0 + Complex['EPSILON'] / 2);
    expect(complex1.equals(complex2)).toBe(true);
    const complex3 = new Complex(1.0, 1.0);
    const complex4 = new Complex(1.0, 1.0 + Complex['EPSILON']);
    expect(complex3.equals(complex4)).toBe(true); // This line should pass on the original code and fail on the mutated code
  });
});