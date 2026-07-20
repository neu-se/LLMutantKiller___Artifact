import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when cosh is not defined', () => {
    const originalCosh = Math.cosh;
    delete Math.cosh;
    expect(() => new Complex(1, 0).cosh()).toThrowError();
    Math.cosh = originalCosh;
  });
});