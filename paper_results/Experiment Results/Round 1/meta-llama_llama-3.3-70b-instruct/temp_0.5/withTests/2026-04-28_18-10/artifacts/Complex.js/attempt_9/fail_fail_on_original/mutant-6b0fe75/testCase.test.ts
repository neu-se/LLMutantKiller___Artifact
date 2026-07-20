import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle the difference between || and && operators', () => {
    const complex = new Complex(1, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(Math.cosh(1));
    expect(coshValue.im).toBeCloseTo(0);
    const originalCosh = Math.cosh;
    jest.spyOn(Math, 'cosh').mockImplementation(() => {
      throw new Error('Mock error');
    });
    const complex2 = new Complex(1, 0);
    expect(() => complex2.cosh()).toThrowError('Mock error');
    Math.cosh = originalCosh;
  });
});