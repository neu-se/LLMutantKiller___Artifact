import { Complex } from '../complex';

describe('Complex', () => {
  it('should throw an error when calling the ceil function with no implementation', () => {
    const complex = new Complex(1.5, 2.7);
    expect(() => complex.ceil()).toThrowError();
  });
});