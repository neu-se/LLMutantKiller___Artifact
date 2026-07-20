import { Complex } from './complex';

describe('Complex', () => {
  it('should not throw an error when calculating acosh with original code', () => {
    const complex = new Complex(2, 0);
    expect(() => complex.acosh()).not.toThrow();
  });
});