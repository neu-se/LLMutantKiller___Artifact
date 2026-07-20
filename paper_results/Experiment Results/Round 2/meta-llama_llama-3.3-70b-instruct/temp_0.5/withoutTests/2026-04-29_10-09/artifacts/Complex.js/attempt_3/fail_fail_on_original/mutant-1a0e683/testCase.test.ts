import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return ZERO when base is zero and exponent is positive real with zero imaginary part and zero imaginary exponent', () => {
    const complex = new Complex(0, 0);
    const result = complex.pow(1, 0);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });

  it('should return ZERO when base is zero and exponent is positive real with zero imaginary part and positive imaginary exponent', () => {
    const complex = new Complex(0, 0);
    const result = complex.pow(1, 1);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});