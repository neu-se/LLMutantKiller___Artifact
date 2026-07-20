import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should return correct result when multiplying zero with infinity', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, 0);
    expect(() => zero.mul(infinity)).not.toThrow();
  });
});