import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for atan when a is 0 and b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});