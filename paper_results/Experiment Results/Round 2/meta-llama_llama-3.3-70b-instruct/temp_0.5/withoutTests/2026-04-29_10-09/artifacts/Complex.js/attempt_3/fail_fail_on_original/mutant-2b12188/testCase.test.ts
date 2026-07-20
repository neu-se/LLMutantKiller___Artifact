import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acosh();
    const expected = new Complex(0, Math.acos(1));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});