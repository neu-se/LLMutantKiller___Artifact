import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly handle the difference between || and && operators', () => {
    const complex = new Complex(0, 1);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(Math.cosh(0));
    expect(coshValue.im).toBeCloseTo(Math.sinh(1));
  });
});