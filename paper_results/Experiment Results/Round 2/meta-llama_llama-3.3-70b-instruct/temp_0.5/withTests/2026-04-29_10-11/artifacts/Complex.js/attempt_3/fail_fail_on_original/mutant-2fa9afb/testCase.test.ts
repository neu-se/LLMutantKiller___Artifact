import { Complex } from './complex';

describe('Complex.js', () => {
  it('should return correct result for sinh function', () => {
    const complex = new Complex(1, 0);
    const result = complex.sinh();
    expect(result.re).toBeCloseTo(1.1752011660461475);
    expect(result.im).toBe(0);
  });
});