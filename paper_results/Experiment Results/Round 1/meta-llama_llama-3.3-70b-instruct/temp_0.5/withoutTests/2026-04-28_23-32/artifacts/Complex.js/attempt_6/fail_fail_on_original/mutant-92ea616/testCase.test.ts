import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).toBeCloseTo(-0.7853981633974483, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});