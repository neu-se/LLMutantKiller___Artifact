import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should correctly handle asec for a non-zero and b = 0', () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});