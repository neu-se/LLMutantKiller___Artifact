import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when multiplying two real complex numbers without a return statement', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    expect(() => c1.mul(c2)).toThrow();
  });
});