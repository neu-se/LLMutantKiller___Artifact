import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.1;
    const resultOriginal = Math.cos(x) - 1;
    const complex = new Complex(x);
    const result = complex.exp().sub(1).div(x).sub(1);
    expect(result.re).toBeCloseTo(resultOriginal, 6);
  });
});