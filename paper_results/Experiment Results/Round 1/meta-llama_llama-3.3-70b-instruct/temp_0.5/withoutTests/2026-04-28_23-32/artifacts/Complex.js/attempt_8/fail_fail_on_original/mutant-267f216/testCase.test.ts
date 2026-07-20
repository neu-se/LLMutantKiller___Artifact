import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 2);
    const result = complex.acsch();
    const expectedRe = 0.48121182505960347;
    const expectedIm = -0.8964764813821068;
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(result.im).toBeCloseTo(expectedIm, 5);
    expect(Math.abs(result.re * result.re - result.im * result.im - 1)).toBeLessThan(1e-5);
  });
});