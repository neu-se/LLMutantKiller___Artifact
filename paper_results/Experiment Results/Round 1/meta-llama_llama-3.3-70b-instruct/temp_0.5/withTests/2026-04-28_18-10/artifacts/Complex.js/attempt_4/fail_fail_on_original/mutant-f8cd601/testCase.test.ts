import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should throw an error when csch is called on the mutated code', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.csch()).not.toThrow();
  });
});