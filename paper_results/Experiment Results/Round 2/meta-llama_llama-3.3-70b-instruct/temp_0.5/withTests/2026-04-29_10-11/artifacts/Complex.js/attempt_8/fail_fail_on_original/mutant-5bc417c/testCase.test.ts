import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a finite result for acoth when the input is not zero and throw an error when the input is zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    const complexZero = new Complex(0, 0);
    expect(() => complexZero.acoth()).toThrow();
  });
});