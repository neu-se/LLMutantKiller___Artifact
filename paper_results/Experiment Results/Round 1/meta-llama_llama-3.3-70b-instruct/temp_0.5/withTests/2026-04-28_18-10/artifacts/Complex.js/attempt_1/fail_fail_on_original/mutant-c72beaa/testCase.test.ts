import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct acot value for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot();
    expect(acot.re).not.toBe((1 * 0));
    expect(acot.im).not.toBe((1 * 0));
  });
});