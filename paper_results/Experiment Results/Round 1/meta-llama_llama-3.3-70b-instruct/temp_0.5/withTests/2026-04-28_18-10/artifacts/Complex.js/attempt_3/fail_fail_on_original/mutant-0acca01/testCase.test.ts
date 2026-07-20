import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const originalResult = new Complex(1 / 2, -1 / 2).atanh();
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});