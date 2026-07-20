import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a finite result for acoth when the input is not zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});