import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when parsing invalid input', () => {
    expect(() => new Complex('')).not.toThrow();
    expect(() => new Complex(null)).toThrow();
  });
});