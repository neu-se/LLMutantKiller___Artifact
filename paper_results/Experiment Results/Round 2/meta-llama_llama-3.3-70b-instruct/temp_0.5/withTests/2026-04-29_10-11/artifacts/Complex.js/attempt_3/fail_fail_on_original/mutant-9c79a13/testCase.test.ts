import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex sech', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const expectedRe = 2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1));
    const expectedIm = -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});