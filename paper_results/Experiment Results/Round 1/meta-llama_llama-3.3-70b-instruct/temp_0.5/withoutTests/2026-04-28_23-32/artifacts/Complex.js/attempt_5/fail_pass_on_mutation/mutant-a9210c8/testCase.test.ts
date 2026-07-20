import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly for a complex number with a non-zero imaginary part and check the property of the object', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    expect(sech.re).not.toBeNaN();
    expect(sech.im).not.toBeNaN();
    expect(complex.im).toBe(2);
  });
});