import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite value for cosecans', () => {
    const complex = new Complex(1, 1);
    const cosecans = complex.csc();
    expect(isFinite(cosecans.re)).toBe(true);
    expect(isFinite(cosecans.im)).toBe(true);
  });
});