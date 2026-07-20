import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should return correct result for sinh function when a is not zero and b is not zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.sinh();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });

  it('should return correct result for sinh function when a is zero and b is zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});