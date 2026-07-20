import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle atanh correctly for a = -1', () => {
    const c = new Complex(-1, 0);
    const result = c.atanh();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});