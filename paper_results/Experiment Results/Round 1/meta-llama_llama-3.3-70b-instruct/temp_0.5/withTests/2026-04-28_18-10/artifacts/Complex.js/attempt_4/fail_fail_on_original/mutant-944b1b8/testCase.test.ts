import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should handle asec function correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(isNaN(result.re) || isNaN(result.im)).toBeFalsy();
  });
});