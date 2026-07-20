import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calling the mutated ceil function', () => {
    const complex = new Complex(1.5, 2.7);
    expect(() => complex.ceil()).toThrowError();
  });
});