import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when a and b are 0 in asec', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrow();
  });
});