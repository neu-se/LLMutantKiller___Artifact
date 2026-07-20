import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle the difference between || and && operators', () => {
    const complex = new Complex(1, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(Math.cosh(1));
    expect(coshValue.im).toBeCloseTo(0);
    const originalCosh = Math.cosh;
    Math.cosh = undefined;
    expect(() => new Complex(1, 0).cosh()).toThrowError();
    Math.cosh = originalCosh;
  });
});