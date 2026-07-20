import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when asech is called with a complex number that has an imaginary part of zero', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.asech()).toThrow();
  });
});