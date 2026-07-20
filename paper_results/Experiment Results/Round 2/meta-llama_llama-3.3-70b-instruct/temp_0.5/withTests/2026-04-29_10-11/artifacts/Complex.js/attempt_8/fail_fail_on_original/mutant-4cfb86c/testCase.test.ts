import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return correct result for acot function', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.toString()).not.toBe('NaN');
  });
});