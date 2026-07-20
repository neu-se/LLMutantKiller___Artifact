import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});