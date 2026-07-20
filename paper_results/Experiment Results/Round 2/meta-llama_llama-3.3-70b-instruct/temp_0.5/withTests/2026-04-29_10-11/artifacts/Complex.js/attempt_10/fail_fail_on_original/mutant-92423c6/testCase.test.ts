import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should handle the cosm1 function correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.expm1();
    const expectedRe = Math.expm1(0.1);
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});