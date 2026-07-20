import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex acsc correctly for a specific input', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.re).not.toBe(0);
    expect(acsc.im).not.toBe(0);
    expect(acsc.re).not.toBeNaN();
    expect(acsc.im).not.toBeNaN();
  });
});