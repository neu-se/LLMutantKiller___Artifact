import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc with mutation detection', () => {
    const complex = new Complex(1, 1);
    const originalResult = complex.acsc();
    const complexMutated = new Complex(1, 1);
    const mutatedResult = complexMutated.acsc();
    expect(originalResult.re).not.toBeCloseTo(mutatedResult.re);
    expect(originalResult.im).not.toBeCloseTo(mutatedResult.im);
  });
});