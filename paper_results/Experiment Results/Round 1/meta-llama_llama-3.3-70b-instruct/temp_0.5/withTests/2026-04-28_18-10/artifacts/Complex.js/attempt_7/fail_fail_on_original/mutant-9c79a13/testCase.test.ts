import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const sech = complex.sech();
    expect(sech.re).not.toBeCloseTo(2 * Math.cosh(1) / Math.cos(1) / (Math.cos(2) + Math.cosh(2)), 1e-10);
    expect(sech.im).toBeCloseTo(-2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)), 1e-10);
  });
});