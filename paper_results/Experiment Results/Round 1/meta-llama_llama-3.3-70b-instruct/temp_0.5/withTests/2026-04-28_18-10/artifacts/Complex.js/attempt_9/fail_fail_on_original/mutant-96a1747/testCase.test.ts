import { Complex } from '../complex';

describe('Complex', () => {
  it('should throw an error when trying to access a non-existent property', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(() => result[""]).toThrowError();
  });
});