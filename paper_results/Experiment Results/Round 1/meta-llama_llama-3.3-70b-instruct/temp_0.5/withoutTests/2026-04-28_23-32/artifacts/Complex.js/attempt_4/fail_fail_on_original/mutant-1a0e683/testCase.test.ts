import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate pow correctly for zero base and positive real exponent with zero imaginary part', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });

  it('should calculate pow correctly for zero base and positive real exponent with negative imaginary part', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, -1);
    const result = c.pow(z);
    expect(result.toString()).not.toBe('0');
  });
});