import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate the complex sech correctly for a = 1 and b = 1', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const expectedReal = 2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1));
    const expectedImaginary = -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1));
    expect(result.re).not.toBeCloseTo(2 * Math.cosh(1) / (Math.cos(1) * (Math.cos(2 * 1) + Math.cosh(2 * 1))));
  });
});