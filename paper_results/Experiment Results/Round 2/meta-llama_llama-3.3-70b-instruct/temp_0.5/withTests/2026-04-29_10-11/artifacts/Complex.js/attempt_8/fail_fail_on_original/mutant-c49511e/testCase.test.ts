import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should not throw an error when calculating cosecans', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.csc()).not.toThrowError();
  });
});