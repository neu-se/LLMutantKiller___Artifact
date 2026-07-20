import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when trying to access a non-existent property', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.atanh()[""]).toThrowError();
  });
});