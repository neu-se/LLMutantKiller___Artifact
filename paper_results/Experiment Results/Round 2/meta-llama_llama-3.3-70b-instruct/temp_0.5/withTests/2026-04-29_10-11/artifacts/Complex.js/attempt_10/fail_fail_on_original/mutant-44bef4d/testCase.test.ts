import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const expectedRe = 0.7853981633974483;
    const expectedIm = -0.7853981633974483;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});