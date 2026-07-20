import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});