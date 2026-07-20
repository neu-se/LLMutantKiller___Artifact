import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when parsing an invalid complex number', () => {
    const complex = new Complex('a');
    expect(complex).toBeInstanceOf(Complex);
  });
});