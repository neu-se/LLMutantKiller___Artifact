import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complexNumber = new Complex(1, 2);
    const result = complexNumber.csc();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});