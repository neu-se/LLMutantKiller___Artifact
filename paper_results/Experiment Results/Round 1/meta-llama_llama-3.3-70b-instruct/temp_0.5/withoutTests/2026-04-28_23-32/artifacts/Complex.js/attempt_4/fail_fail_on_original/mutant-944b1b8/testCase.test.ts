import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a complex number with a real part of 0.5 and an imaginary part of 0', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});