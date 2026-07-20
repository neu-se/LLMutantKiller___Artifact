import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly for b = 0 in the original code but fail in the mutated code', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
  });
});