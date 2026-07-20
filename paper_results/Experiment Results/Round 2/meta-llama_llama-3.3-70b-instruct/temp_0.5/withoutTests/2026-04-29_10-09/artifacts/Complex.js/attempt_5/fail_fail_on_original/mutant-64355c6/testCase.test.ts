import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly for a non-zero value', () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});