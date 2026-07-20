import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle atanh correctly for a = -1 and a = 1', () => {
    const c1 = new Complex(-1, 0);
    const c2 = new Complex(1, 0);
    expect(c1.atanh().re).not.toBe(c2.atanh().re);
  });
});