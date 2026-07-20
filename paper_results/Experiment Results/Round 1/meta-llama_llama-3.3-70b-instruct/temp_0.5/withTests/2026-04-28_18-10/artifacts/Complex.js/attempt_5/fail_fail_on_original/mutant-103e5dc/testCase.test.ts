import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const expected = new Complex(1, 0).div(complex.sin());
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});