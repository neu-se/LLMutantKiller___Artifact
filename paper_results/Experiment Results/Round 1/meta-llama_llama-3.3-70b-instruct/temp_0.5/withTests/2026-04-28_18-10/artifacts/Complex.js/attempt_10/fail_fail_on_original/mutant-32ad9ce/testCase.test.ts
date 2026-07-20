import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, NaN);
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
    expect(complex.toString()).toBe('NaN');
    const complex2 = new Complex(NaN, 1);
    expect(complex2.re).toBeNaN();
    expect(complex2.im).toBe(1);
  });
});