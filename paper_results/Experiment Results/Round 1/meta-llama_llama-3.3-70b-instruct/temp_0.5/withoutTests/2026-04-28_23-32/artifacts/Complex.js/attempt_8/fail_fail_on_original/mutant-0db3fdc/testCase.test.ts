import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
    const mutatedResult = (x * x) / ((x * x) / 20922789888000 - 1 / 87178291200);
    expect(result).not.toBeCloseTo(mutatedResult, 10);
  });
});