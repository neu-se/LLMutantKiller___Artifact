import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    const expected = new Complex(0, Math.PI / 2);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});