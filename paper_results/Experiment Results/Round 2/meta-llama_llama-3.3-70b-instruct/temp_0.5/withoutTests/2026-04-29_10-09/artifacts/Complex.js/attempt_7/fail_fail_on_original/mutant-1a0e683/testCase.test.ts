import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result when base is zero and exponent is positive real with zero imaginary part and zero imaginary exponent', () => {
    const complex = new Complex(0, 0);
    const result = complex.pow(1, 0);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });

  it('should return correct result when base is zero and exponent is positive real with zero imaginary part and very small positive imaginary exponent', () => {
    const complex = new Complex(0, 0);
    const result = complex.pow(1, 1e-10);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});