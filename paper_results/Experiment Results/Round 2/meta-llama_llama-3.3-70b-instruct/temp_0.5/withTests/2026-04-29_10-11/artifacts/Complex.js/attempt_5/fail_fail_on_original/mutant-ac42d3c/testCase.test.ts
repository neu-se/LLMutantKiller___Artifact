import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should return the correct result for atan when b is -1', () => {
    const c = new Complex(0, -1);
    expect(() => c.atan()).toThrow();
  });
});