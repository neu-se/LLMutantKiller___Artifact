import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with negative real part and positive imaginary part', () => {
    const complexNumber = new Complex('-1+2i');
    expect(complexNumber.re).toBe(-1);
    expect(complexNumber.im).toBe(2);
  });
});