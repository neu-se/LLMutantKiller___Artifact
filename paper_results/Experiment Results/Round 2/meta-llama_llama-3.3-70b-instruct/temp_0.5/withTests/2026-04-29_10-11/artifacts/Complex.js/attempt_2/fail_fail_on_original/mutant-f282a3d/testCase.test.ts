import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);

    const complexNumber2 = new Complex('1+2');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(0);

    const complexNumber3 = new Complex('1+i');
    expect(complexNumber3.re).toBe(1);
    expect(complexNumber3.im).toBe(1);
  });
});