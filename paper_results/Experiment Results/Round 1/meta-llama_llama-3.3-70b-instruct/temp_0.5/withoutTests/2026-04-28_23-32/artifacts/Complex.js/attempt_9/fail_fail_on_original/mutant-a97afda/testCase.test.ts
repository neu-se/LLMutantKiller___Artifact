import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle the case where a is 1 and b is 0 in the atan function', () => {
    const complex = new Complex(1, 0);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});