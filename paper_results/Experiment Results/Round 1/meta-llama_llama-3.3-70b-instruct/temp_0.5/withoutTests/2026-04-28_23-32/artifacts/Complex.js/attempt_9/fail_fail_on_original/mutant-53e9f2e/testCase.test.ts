import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493, 4);
    expect(result.im).toBeCloseTo(0, 4);
    const complex2 = new Complex(0.5, 0);
    const result2 = complex2.atanh();
    expect(result2.re).toBeCloseTo(result.re, 4);
    expect(result2.im).toBeCloseTo(result.im, 4);
    const complex3 = new Complex(1.5, 0);
    const result3 = complex3.atanh();
    expect(result3.re).toBeCloseTo(0.5493, 4);
    expect(result3.im).toBeCloseTo(0, 4);
  });
});