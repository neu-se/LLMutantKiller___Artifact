import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly and check if im property is a number', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    expect(sech.re).not.toBeNaN();
    expect(sech.im).not.toBeNaN();
    expect(complex.im).toBe(2);
    expect(complex.im).toBeGreaterThan(1);
  });
});