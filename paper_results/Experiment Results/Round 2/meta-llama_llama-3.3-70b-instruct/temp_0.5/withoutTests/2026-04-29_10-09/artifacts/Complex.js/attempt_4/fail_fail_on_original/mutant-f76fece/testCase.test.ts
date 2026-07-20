import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0 + Complex['EPSILON'] / 2);
    expect(complex1.equals(complex2)).toBe(true);
  });
  it('should not compare two complex numbers with difference equal to epsilon', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0 + Complex['EPSILON']);
    expect(complex1.equals(complex2)).toBe(false); // This line should fail on the original code and pass on the mutated code
  });
});