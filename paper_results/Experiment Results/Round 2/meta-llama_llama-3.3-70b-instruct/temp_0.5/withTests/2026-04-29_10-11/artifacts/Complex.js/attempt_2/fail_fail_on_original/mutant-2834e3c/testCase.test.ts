import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when asech is called with a specific value', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrow();
  });
});