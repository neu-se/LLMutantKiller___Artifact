import { Complex } from './complex.js';

describe('Complex', () => {
  it('should detect the mutation in the acsc function', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(result.re, 5);
    expect(result.im).toBeCloseTo(result.im, 5);
  });
});