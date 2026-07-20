import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a non-zero input', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});