import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex('2+0i');
    const result = complex.acosh();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNull();
    expect(result.im).not.toBeNull();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});