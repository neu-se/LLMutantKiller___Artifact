import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should not throw an error when calculating acot', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acot()).not.toThrow();
  });
});