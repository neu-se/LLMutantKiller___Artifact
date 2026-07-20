import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(1.4722194895836184);
    expect(result.im).toBeCloseTo(0);
  });
});