import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    const expectedRe = Math.sin(1) * Math.cosh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1));
    const expectedIm = -Math.cos(1) * Math.sinh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1));
    expect(csc.re).toBeCloseTo(expectedRe, 10);
    expect(csc.im).toBeCloseTo(expectedIm, 10);
  });
});