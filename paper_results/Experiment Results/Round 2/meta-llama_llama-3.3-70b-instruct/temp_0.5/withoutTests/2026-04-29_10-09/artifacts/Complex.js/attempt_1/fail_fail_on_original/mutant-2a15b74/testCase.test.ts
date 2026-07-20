import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.div(b);
    expect(result.re).toBeCloseTo((1 * 3 + 2 * 4) / (3 * 3 + 4 * 4), 10);
    expect(result.im).toBeCloseTo((2 * 3 - 1 * 4) / (3 * 3 + 4 * 4), 10);
  });
});