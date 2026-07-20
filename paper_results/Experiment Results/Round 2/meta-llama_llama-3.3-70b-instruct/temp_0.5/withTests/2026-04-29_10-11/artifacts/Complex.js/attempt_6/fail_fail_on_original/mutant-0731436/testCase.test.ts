import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});