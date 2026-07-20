import { Complex } from "../../../complex.js";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    const originalResult = new Complex(0, Math.PI / 4);
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});