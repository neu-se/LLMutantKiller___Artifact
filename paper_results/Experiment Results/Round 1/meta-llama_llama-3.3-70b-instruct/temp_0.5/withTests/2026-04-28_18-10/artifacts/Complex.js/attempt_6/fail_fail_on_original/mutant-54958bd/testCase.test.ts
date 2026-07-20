import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating acosh with mutated code', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.acosh()).toThrowError();
  });
});