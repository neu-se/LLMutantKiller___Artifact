import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should return correct result for sinh function', () => {
    const complex = new Complex(1, 0);
    const result = complex.sinh();
    expect(result.re).toBeCloseTo(1.1752011660461475);
    expect(result.im).toBe(0);
  });

  it('should return correct result for sinh function when a is zero and b is zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});