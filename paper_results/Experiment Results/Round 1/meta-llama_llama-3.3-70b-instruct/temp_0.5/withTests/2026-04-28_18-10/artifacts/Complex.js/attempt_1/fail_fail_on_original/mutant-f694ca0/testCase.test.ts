import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.exp().sub(1);
    const expected = complex.expm1();
    expect(result.equals(expected)).toBe(true);
  });
});