import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const sech = complex.sech();
    const expectedRe = 2 * Math.cosh(1) * Math.cos(0) / (Math.cos(0) + Math.cosh(0));
    const expectedIm = -2 * Math.sinh(1) * Math.sin(0) / (Math.cos(0) + Math.cosh(0));
    expect(sech.re).toBeCloseTo(expectedRe, 10);
    expect(sech.im).toBeCloseTo(expectedIm, 10);
  });
});