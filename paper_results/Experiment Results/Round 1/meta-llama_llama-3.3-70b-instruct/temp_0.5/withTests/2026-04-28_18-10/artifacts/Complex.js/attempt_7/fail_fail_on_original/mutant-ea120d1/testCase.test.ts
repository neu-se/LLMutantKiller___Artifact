import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly for numbers at the threshold', () => {
    const result1 = Complex.hypot(2999.999, 3000);
    const result2 = Complex.hypot(3000, 3000);
    expect(result1).toBeCloseTo(Math.sqrt(2999.999 * 2999.999 + 3000 * 3000), 4);
    expect(result2).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000), 4);
  });
});