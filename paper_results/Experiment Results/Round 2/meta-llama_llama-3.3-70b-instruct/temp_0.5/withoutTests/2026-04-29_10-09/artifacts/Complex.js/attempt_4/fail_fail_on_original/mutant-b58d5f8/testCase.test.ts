import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when parsing invalid input', () => {
    const complex = new Complex('a');
    expect(complex.toString()).toBe('NaN');
  });
});