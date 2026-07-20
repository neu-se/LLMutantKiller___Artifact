import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when calling the ceil function with no implementation', () => {
    const complex = new Complex(1.2, 3.4);
    expect(() => complex.ceil(1)).toThrowError();
  });
});