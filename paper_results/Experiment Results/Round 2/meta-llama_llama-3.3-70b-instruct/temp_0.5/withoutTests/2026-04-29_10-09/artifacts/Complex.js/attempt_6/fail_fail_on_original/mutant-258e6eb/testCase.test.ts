import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
    const noIM = complex.re > 1 && complex.im === 0;
    if (noIM) {
      expect(result.im).toBeCloseTo(0);
    } else {
      expect(result.im).not.toBeCloseTo(0);
    }
  });
});