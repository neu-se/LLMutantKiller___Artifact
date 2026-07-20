import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const expected = Math.sin(1) * Math.cosh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2));
    expect(result.re).toBeCloseTo(expected, 10);
  });
});