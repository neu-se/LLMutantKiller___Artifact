import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for atan when a is 0 and b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});