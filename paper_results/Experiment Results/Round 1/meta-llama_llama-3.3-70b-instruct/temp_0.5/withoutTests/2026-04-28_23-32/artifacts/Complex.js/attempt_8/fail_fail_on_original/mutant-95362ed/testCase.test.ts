import { Complex } from './complex.js';

describe('Complex number parsing', () => {
  it('should throw an error for default case', () => {
    expect(() => new Complex({})).toThrowError();
  });
});