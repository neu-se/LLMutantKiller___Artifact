import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(0, 1);
    const sech = complex.sech();
    expect(sech.re).toBeCloseTo(2 * Math.cosh(0) * Math.cos(1) / (Math.cos(2) + Math.cosh(2)));
    expect(sech.im).toBeCloseTo(-2 * Math.sinh(0) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)));
  });
});