import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a defined value for cosecans', () => {
    const complex = new Complex(1, 1);
    const cosecans = complex.csc();
    expect(cosecans.re).toBeDefined();
    expect(cosecans.im).toBeDefined();
  });
});