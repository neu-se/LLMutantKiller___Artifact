import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for b = 0', () => {
    const complex = new Complex(1, 0);
    expect(complex.atanh().im).toBeCloseTo(0);
  });
});