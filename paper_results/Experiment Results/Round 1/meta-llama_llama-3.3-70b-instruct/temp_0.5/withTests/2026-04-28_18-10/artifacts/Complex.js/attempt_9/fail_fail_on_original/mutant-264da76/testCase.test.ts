import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    const expectedRe = 0.5493061443340548;
    const expectedIm = -0.5493061443340548;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});