import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    const expected = new Complex(2 * Math.cos(0) / (Math.cos(0) + Math.cosh(2)), -2 * Math.sin(0) / (Math.cos(0) + Math.cosh(2)));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});