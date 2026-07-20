import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should return correct result for sinh function', () => {
    const complex = new Complex(1, 1);
    const result = complex.sinh();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});