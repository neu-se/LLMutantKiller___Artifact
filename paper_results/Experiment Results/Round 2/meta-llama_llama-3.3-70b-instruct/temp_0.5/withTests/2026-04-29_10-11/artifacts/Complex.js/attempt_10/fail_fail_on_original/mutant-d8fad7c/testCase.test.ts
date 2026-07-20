import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a finite result for acsch when the condition (a !== 0) is met', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});