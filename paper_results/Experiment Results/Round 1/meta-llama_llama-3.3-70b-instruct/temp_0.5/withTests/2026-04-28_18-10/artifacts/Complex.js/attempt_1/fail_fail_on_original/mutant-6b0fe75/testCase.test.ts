import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should throw an error when Math.cosh is not supported', () => {
    // Create a spy for Math.cosh to simulate it being undefined
    const originalCosh = Math.cosh;
    Math.cosh = undefined;

    // Attempt to use the Complex library
    expect(() => new Complex(1, 1).cosh()).toThrowError();

    // Restore the original Math.cosh
    Math.cosh = originalCosh;
  });
});