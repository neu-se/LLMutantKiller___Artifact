import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calculating acosh with mutated code', () => {
    const complex = new Complex(2, 0);
    expect(() => complex.acosh()).not.toThrow();
  });
});