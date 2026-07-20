import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should calculate acsch correctly for b != 0 and return different result', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(0, 10);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acsch();
    expect(result.re).not.toBeCloseTo(result2.re, 10);
    expect(result.im).not.toBeCloseTo(result2.im, 10);
  });
});