import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers with "i" and "I" notation', () => {
    const complexNumber1 = new Complex('3+4i');
    const complexNumber2 = new Complex('3+4I');
    expect(complexNumber1.re).toBe(3);
    expect(complexNumber1.im).toBe(4);
    expect(complexNumber2.re).toBe(3);
    expect(complexNumber2.im).toBe(4);
  });
});