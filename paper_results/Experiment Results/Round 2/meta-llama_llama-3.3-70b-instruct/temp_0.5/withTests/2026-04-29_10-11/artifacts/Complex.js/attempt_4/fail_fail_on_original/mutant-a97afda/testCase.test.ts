import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle the case when a is 0 and b is 2 in the atan function', () => {
    const complex = new Complex(0, 2);
    const result = complex.atan();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(Infinity, 10);
  });
});