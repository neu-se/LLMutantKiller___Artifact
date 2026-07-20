import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return correct result for acsch method with non-zero denominator', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acsch();
    expect(result.re).not.toBeCloseTo(result2.re);
  });
});