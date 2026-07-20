import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('toString should return the correct string representation of a complex number', () => {
    const complex = new Complex(1, -0);
    expect(complex.toString()).toBe('1');
  });
});