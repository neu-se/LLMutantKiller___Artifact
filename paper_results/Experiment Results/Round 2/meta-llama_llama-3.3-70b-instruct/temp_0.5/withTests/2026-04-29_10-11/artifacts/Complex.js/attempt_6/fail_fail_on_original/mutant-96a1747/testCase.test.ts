import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calculating atanh with mutated code', () => {
    const complex = new Complex(1.1, 0);
    expect(() => complex.atanh()).toThrow();
  });
});