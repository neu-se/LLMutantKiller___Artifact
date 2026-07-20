import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate cosm1', () => {
    const x = 0.1;
    const result = Math.cos(x) - 1;
    const complex = new Complex(x);
    const cosm1Result = complex.expm1().re - x;
    expect(cosm1Result).toBeCloseTo(result, 10);
  });
});