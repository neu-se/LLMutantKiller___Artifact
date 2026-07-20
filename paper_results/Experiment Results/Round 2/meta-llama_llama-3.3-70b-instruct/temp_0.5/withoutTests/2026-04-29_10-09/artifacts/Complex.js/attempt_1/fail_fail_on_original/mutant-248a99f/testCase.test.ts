import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle division by zero or infinity', () => {
    const complex = new Complex(0, 0);
    const result = complex.div(0, 0);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });
});