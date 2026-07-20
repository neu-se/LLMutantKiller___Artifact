import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return different results for acsc with original and mutated implementation', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = complex.acsc();
    const complexMutated = new Complex(1, 2);
    complexMutated['im'] = -complexMutated['im'] * complexMutated['re'];
    const resultMutated = complexMutated.asin();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 5);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 5);
  });
});