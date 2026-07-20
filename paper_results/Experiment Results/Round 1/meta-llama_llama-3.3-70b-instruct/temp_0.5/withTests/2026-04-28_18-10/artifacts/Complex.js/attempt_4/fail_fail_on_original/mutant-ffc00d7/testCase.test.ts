import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when parsing an invalid complex number', () => {
    const complex = new Complex('');
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});