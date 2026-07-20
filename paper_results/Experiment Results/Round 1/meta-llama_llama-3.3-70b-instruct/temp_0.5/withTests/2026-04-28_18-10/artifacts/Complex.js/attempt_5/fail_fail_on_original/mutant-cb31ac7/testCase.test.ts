import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return correct result for cosm1 function', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const resultOriginal = complex.cosm1(x);
    const complexMutated = new Complex(x);
    const resultMutated = complexMutated.cosm1(x);
    expect(resultOriginal).not.toBeCloseTo(resultMutated);
  });
});