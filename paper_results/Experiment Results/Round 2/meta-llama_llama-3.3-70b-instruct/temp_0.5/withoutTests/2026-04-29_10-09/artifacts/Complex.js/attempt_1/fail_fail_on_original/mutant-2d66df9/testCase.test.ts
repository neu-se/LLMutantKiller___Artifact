import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with negative imaginary part', () => {
    const complexNumber = new Complex('3-4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(-4);
  });
});