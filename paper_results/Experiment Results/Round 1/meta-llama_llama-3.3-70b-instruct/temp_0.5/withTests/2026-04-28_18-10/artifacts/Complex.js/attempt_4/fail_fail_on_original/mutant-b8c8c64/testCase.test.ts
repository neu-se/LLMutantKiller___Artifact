import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should throw an error when trying to access an undefined property in the mul function', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(() => result[""]).toThrowError();
  });
});