import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when calculating acot with mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acot()).toThrowError();
  });
});