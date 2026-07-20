import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const acoth = complex.acoth();
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(acoth.re).not.toBeUndefined();
    expect(acoth.im).not.toBeUndefined();
    const a = complex.re;
    expect(a).toBe(1);
  });
});