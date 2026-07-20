import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not throw an error when calling atanh', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.atanh()).not.toThrow();
  });
});