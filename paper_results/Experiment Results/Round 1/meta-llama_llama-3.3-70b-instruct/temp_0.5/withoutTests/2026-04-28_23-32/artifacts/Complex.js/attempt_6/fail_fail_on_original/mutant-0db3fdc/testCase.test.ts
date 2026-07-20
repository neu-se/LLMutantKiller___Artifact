import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const resultOriginal = Math.cos(x) - 1;
    const result = complex.cosm1();
    const tolerance = 1e-10;
    expect(Math.abs(result - resultOriginal)).toBeLessThan(tolerance);
    const mutatedResult = (x * x) / ((x * x) / 20922789888000 - 1 / 87178291200);
    expect(result).not.toBeCloseTo(mutatedResult, 10);
  });
});