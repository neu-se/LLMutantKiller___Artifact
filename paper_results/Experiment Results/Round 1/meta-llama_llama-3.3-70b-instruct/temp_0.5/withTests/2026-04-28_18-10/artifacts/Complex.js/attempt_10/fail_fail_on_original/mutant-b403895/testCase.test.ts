import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for asec', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    const a = 1;
    const b = 0;
    const d = a * a + b * b;
    expect(d).toBeGreaterThan(0);
    expect(a / d).toBeGreaterThan(0);
    expect(a * 0).toBe(0);
  });
});