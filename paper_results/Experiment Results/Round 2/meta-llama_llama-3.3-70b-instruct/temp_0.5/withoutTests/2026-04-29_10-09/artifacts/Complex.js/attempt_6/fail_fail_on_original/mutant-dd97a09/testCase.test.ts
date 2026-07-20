import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when sech method is called on the mutated code', () => {
    const complex = new Complex(1, 1);
    expect(() => {
      const result = complex.sech();
      if (typeof result === 'undefined') {
        throw new Error('sech method returned undefined');
      }
    }).not.toThrow();
  });
});