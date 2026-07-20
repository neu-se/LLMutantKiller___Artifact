import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    const expectedRe = result.re;
    const expectedIm = result.im;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});