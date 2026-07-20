import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);

    const complexNumber2 = new Complex('1+i');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(1);

    expect(() => new Complex('1+')).toThrowError('Invalid Param');
  });
});