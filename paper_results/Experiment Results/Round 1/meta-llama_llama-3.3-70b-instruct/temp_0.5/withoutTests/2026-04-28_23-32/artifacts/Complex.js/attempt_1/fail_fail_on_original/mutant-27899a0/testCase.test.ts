import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const c = new Complex(-1, 0);
    expect(c.atanh().re).toBe(Infinity);
    expect(c.atanh().im).toBe(0);
  });
});