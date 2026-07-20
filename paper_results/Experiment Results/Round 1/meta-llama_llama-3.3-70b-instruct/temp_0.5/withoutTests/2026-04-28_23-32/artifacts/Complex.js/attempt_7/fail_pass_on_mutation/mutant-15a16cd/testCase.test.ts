import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly floor the complex number with decimal places', () => {
    const complex = new Complex(12.3456, 7.8901);
    const floored = complex.floor(2);
    expect(Math.floor(complex.re * 100) / 100).toBeCloseTo(floored.re);
    expect(Math.floor(complex.im * 100) / 100).toBeCloseTo(floored.im);
  });
});