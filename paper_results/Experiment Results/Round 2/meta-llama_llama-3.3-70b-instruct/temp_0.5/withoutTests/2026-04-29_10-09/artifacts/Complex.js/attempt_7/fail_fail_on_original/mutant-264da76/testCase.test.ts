import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expected = new Complex(0.5, -0.5).atanh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});