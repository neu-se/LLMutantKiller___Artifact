import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const x = 1e-9;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = new Complex(Math.exp(x) - 1, 0);
    expect(result.equals(expected)).toBe(true);
  });
});