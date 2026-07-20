import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number to decimal places', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(2);
    expect(Math.floor(result.re)).not.toBeCloseTo(result.re, 0);
    expect(Math.floor(result.im)).not.toBeCloseTo(result.im, 0);
  });
});