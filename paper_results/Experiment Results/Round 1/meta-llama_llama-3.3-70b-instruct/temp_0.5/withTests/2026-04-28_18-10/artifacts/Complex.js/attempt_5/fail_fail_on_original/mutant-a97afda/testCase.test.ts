import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct value for atan when a is 0 and b is not 1', () => {
    const complex = new Complex(0, 2);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).not.toBeCloseTo(Infinity);
  });
});