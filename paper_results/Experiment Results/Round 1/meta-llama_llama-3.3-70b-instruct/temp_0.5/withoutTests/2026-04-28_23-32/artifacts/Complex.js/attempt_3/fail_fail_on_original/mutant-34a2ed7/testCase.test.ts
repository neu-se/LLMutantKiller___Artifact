import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly parse a complex number from a string and handle the case when the input string has a single number', () => {
    const complex = new Complex('1');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(0);
  });
});