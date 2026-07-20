import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(1);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.exp(1) - 1, 0);
    expect(result.equals(expected)).toBe(true);
  });
});