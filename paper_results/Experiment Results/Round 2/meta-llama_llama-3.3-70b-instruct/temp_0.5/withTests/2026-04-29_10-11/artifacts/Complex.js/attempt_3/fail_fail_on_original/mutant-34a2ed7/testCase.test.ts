import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    expect(new Complex('1+2i').toString()).toBe('1 + 2i');
    expect(new Complex('1').toString()).toBe('1');
  });
});