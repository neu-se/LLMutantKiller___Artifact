import { Complex } from './complex.js';

describe('Complex', () => {
  it('should parse a complex number from a string correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1, 5);
    expect(complex.im).toBeCloseTo(2, 5);
    const complex2 = new Complex('1');
    expect(complex2.re).toBeCloseTo(1, 5);
    expect(complex2.im).toBeCloseTo(0, 5);
    const complex3 = new Complex('1.5');
    expect(complex3.re).toBeCloseTo(1.5, 5);
    expect(complex3.im).toBeCloseTo(0, 5);
    expect(() => new Complex('')).not.toThrow();
  });
});