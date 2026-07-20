import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh with a > 1 and b === 0', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});