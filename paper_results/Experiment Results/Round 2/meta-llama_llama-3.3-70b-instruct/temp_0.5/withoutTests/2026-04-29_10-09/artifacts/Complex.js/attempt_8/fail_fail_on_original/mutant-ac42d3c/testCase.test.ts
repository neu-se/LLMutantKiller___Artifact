import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number when b is -1 in atan and a is 0, and the result should have a real part and an imaginary part', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});