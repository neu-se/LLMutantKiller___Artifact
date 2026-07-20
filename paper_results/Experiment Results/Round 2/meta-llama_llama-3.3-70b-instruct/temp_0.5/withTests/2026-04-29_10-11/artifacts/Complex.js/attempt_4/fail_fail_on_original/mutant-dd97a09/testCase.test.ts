import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return a Complex object with real and imaginary parts when sech function is called', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});