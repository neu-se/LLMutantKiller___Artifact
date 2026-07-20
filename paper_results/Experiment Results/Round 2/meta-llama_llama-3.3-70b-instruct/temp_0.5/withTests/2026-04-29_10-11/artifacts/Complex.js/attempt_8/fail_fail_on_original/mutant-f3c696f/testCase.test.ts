import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acot with a = 0 and b = 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 0), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});