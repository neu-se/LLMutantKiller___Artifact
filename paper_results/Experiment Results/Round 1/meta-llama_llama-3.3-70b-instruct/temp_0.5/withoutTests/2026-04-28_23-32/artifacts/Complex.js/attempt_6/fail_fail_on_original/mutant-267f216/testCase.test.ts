import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(0);
    expect(result.re * result.re - result.im * result.im).toBeCloseTo(1, 5);
  });
});