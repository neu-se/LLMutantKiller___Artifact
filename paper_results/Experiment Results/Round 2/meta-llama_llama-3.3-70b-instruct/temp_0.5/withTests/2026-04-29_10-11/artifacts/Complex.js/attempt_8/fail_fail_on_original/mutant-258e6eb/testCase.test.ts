import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
    expect(result.re).toBeGreaterThan(0);
  });
});