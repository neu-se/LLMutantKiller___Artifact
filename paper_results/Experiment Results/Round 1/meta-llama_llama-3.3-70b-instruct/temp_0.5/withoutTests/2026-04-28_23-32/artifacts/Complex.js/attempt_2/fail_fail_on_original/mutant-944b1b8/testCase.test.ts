import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a complex number with a real part of zero and an imaginary part of zero', () => {
    const complex = new Complex(0, 0);
    expect(complex.asech().re).toBe(Infinity);
    expect(complex.asech().im).toBe(0);
  });
});