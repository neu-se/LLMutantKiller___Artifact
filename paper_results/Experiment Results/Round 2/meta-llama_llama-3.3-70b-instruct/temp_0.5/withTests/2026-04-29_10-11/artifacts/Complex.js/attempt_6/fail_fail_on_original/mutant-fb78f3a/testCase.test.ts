import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should return the correct result for asec function when a is 0 and b is 0 in the original code but not in the mutated code', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.toString()).not.toBe('0 Infinity');
  });
});