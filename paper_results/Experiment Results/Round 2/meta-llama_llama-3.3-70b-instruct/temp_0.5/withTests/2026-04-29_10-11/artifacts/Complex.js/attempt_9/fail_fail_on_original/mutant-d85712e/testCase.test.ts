import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complex2 = new Complex('1+3i');
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(3);
    expect(new Complex('1+2i').toString()).toBe('1 + 2i');
    expect(new Complex('1-2i').toString()).toBe('1 - 2i');
    expect(new Complex('1+2i').equals('1+2i')).toBe(true);
    expect(new Complex('1+2i').equals('1+3i')).toBe(false);
    const complex3 = new Complex('1+Stryker was here!i');
    expect(complex3.im).toBeNaN();
  });
});