import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when parsing a complex number string with an "i" without a preceding number', () => {
    expect(() => new Complex('i')).toThrowError();
  });
});