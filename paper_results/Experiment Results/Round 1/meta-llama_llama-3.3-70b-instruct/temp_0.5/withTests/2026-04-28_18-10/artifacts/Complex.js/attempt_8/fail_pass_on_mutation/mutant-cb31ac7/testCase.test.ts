import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return correct result for expm1 function with small input', () => {
    const complex = new Complex(0.00000001);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(0.00000001, 8);
  });
});