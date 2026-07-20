import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeCloseTo(result.re, 10);
    expect(result2.im).not.toBeCloseTo(result.im, 10);
  });
});