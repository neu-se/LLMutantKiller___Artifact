import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when csch is not implemented', () => {
    const complex = new Complex(1, 1);
    expect(() => {
      const csch = complex['csch']();
      if (typeof csch === 'undefined') {
        throw new Error('csch is not implemented');
      }
    }).not.toThrow();
  });
});