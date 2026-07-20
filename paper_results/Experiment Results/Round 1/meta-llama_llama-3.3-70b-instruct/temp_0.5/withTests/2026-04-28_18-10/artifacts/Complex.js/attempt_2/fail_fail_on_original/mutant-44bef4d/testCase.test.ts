import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = new Complex(1, 2).acsc();
    const resultMutated = new Complex(1, 2);
    resultMutated['im'] = -resultMutated['im'] * resultMutated['re'];
    resultMutated = resultMutated.asin();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im);
  });
});