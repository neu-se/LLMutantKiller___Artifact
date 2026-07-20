import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should be able to create an instance of Complex', () => {
    const complex = new Complex(1, 2);
    expect(complex).toBeInstanceOf(Object);
  });
});