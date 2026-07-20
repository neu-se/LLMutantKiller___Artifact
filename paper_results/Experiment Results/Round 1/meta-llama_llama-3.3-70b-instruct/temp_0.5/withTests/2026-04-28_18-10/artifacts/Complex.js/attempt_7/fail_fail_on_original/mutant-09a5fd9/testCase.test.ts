import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const sech = complex.sech();
    const expectedRe = 2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2) + Math.cosh(2));
    const expectedIm = -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2));
    expect(sech.re).toBeCloseTo(expectedRe);
    expect(sech.im).toBeCloseTo(expectedIm);
  });
});