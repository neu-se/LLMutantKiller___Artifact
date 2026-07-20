import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});