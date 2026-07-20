import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for values near 3000', () => {
    const c = new Complex(3000, 2999);
    const result = c.abs();
    const expected = Math.sqrt(3000 * 3000 + 2999 * 2999);
    expect(result).toBeCloseTo(expected, 10);
  });
});