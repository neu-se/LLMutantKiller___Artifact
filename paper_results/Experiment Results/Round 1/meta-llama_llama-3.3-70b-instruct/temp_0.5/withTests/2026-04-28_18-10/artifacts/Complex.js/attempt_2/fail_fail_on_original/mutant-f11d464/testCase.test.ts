import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should correctly handle fully imaginary base in pow function', () => {
    const complex = new Complex(0, 1);
    const result = complex.pow(2);
    expect(result.re).toBeCloseTo(-1);
    expect(result.im).toBeCloseTo(0);
  });

  it('should throw an error for invalid pow operation', () => {
    const complex = new Complex(0, 1);
    const result = complex.pow(2);
    expect(() => new Complex(0, 0).pow(result)).toThrow();
  });
});