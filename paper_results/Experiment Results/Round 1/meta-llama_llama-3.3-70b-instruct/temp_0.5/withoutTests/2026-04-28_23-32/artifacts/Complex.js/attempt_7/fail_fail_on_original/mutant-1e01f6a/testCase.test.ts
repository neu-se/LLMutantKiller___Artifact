import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers greater than 1 with correct sign', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });

  it('should correctly calculate atanh for real numbers less than -1 with correct sign', () => {
    const complex = new Complex(-2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
    if (result.re > 0) {
      expect(result.im).toBeLessThan(0);
    } else {
      expect(result.im).toBeGreaterThan(0);
    }
  });
});