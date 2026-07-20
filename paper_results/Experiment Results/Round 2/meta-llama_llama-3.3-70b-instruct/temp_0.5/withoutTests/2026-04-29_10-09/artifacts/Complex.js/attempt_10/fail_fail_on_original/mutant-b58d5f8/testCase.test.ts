import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when parsing null input', () => {
    const complex = new Complex(null);
    expect(complex.toString()).not.toBe('0 0i');
  });
});