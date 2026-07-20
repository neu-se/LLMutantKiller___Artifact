import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const complex = new Complex(-1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});