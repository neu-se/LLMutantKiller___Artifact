import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should detect the mutation in the acsc function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});