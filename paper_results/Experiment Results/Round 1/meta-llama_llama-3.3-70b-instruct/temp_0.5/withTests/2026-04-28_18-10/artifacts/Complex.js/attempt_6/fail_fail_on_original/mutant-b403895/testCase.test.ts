import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for asec', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    const a = 1;
    const b = 0;
    const d = a * a + b * b;
    const result2 = new Complex(
      (a !== 0) ? a / d : 0,
      (b !== 0) ? -b / d : 0).atan();
    expect(result.re).not.toBeCloseTo(result2.re, 10);
  });
});