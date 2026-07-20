import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly for non-mutated code and fail for mutated code', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    const expected = Math.log(2 + Math.sqrt(5));
    expect(result.re).toBeCloseTo(expected, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});