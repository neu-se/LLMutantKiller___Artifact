import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should return correct result for sinh function', () => {
    const complex = new Complex(0, 0);
    const result = complex.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.sinh();
    expect(result2.re).not.toBe(0);
    expect(result2.im).toBe(0);
  });
});