import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('3+4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
    const complexNumber2 = new Complex('3+4');
    expect(complexNumber2.re).toBe(3);
    expect(complexNumber2.im).toBe(0);
  });
});