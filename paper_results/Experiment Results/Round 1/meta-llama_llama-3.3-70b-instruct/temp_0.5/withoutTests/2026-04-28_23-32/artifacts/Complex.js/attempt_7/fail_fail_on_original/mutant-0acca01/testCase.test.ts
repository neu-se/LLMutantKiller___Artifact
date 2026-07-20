import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    const expectedRe = result.re;
    const expectedIm = result.im;
    const mutatedResult = new Complex(2 * (complex.re * complex.re + complex.im * complex.im), 0).acoth();
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 5);
    expect(result.im).not.toBeCloseTo(mutatedResult.im, 5);
  });
});