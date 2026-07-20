import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should multiply two complex numbers correctly', () => {
    const complex1 = new Complex(2, 0);
    const complex2 = new Complex(4, 0);
    const result = complex1.mul(complex2);
    expect(result.re).toBeCloseTo(8);
    expect(result.im).toBeCloseTo(0);
  });
});