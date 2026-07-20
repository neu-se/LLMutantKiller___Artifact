import { Complex } from '../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate pow correctly', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.toString()).toBe('1');
  });
});