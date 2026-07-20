import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.re).not.toBeNaN();
    expect(acsc.im).not.toBeNaN();
  });
});