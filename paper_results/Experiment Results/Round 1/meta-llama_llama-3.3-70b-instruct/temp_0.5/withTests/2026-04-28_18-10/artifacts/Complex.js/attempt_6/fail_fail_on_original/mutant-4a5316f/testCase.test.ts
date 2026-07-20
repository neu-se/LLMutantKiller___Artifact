import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acoth();
    const complexMutated = new Complex(1, -1);
    const resultMutated = complexMutated.acoth();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
  });
});