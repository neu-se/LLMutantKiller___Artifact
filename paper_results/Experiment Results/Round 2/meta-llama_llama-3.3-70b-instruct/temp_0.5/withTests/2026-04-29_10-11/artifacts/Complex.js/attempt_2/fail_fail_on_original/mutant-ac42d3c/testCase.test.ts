import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should throw an error when b is -1 in atan', () => {
    const c = new Complex(0, -1);
    expect(() => c.atan()).toThrow();
  });
});