import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate pow correctly for zero base and positive real exponent with zero imaginary part', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });

  it('should calculate pow correctly for zero base and positive real exponent with zero imaginary part and return 1', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });

  it('should calculate pow correctly for zero base and positive real exponent with negative imaginary part', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, -1);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });

  it('should calculate pow correctly for zero base and positive real exponent with positive imaginary part', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 1);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });
});