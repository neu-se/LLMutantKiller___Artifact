import { Complex } from './complex';

describe('Complex.js', () => {
  it('should throw an error when cosh is not implemented', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.cosh()).toThrowError();
  });
});