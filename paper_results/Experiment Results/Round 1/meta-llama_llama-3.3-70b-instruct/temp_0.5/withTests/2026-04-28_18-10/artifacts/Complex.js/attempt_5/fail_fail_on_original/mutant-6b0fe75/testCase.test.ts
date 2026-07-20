import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle the difference between || and && operators', () => {
    const originalCosh = Math.cosh;
    Math.cosh = null;
    const complex = new Complex(0, 1);
    expect(() => complex.cosh()).toThrowError();
    Math.cosh = originalCosh;
  });
});