import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle division by zero and infinity', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(0, 0);
    const result = c1.div(c2);
    expect(result.isInfinite()).toBe(true);
    expect(result.equals(Complex.NAN)).toBe(false);
  });
});