import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate pow correctly', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });

  it('should handle pow with positive real and zero imaginary part', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });

  it('should handle pow with positive real and negative imaginary part', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, -1);
    const result = c.pow(z);
    expect(result.toString()).not.toBe('1');
  });
});