import { Complex } from "../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly', () => {
    const complex = new Complex(0.01);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.exp(0.01) - 1, 0);
    expect(result.equals(expected)).toBe(true);
  });
});