import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly parse a complex number from a string and handle the case when the input string has a number followed by a non-numeric character', () => {
    const complex = new Complex('1a');
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
  });
});