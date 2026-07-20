import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should have a csch function that does not throw an error', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.csch()).not.toThrow();
  });
});