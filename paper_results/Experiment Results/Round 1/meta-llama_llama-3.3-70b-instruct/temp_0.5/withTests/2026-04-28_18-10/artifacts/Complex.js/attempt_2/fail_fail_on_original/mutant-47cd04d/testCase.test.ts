import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle addition with infinite values', () => {
    const c1 = new Complex('Infinity');
    const c2 = new Complex(1, 0);
    const result = c1.add(c2);
    expect(result.toString()).toBe('Infinity');
  });
});