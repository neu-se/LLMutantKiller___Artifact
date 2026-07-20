import { Complex } from '../complex';

describe('Complex', () => {
  it('should return the correct result for asec function when a is 0 and b is 0', () => {
    const complex = new Complex(0, 0);
    expect(complex.asec().toString()).toBe('0 Infinity');
  });
});