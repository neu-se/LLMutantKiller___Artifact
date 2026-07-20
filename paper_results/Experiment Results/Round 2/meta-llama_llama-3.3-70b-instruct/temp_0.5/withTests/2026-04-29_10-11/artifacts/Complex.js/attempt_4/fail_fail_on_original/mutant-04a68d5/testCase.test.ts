import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should not throw an error when calculating sech', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.sech()).not.toThrow();
  });
});