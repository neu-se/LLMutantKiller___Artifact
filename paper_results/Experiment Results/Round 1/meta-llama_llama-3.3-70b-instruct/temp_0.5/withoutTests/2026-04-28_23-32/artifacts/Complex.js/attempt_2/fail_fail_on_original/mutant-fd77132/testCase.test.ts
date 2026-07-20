import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calling asec on a Complex instance', () => {
    const c = new Complex(1, 1);
    expect(() => c.asec()).toThrowError();
  });
});