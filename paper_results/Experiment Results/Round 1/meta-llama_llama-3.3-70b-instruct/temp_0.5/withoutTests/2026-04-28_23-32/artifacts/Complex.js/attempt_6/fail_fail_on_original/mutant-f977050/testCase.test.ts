import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
    expect(() => result.im = -result.re).not.toThrow();
  });
});