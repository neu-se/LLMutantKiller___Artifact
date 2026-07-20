import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when trying to access the im property of a null complex number', () => {
    const complex = new Complex(null);
    expect(() => complex.im).toThrowError();
  });
});