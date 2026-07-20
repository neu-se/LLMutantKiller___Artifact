import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.exp().sub(1).div(complex);
    const expected = complex.expm1();
    expect(result.equals(expected)).toBe(true);
  });
});