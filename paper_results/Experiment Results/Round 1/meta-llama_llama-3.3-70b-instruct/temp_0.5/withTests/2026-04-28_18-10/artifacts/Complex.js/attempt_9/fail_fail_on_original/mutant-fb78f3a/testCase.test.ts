import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly handle asec for a = 1 and b = 0', () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    expect(result.toString()).toBe('0,Infinity');
  });
});