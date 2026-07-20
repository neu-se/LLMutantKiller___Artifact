import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cosh();
    const expected = new Complex(Math.cosh(x), 0);
    expect(result.equals(expected)).toBe(true);
  });
});