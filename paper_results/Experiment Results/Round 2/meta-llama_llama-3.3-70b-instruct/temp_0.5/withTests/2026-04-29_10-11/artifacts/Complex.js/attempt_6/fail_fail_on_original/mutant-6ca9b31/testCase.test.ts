import { Complex } from './complex';

describe('Complex', () => {
  it('toString should return the correct string representation of a complex number', () => {
    const complex = new Complex(1, 0);
    expect(complex.toString()).not.toBe('1+0i');
  });
});