import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the csc function', () => {
    const c = new Complex(1, 2);
    const result = c.csc();
    expect(result.re).toBeCloseTo(-0.030337030337030336, 10);
    expect(result.im).toBeCloseTo(0.030337030337030336, 10);
  });
});