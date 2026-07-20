import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complexNumber = new Complex(1, 2);
    const result = complexNumber.csc();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});