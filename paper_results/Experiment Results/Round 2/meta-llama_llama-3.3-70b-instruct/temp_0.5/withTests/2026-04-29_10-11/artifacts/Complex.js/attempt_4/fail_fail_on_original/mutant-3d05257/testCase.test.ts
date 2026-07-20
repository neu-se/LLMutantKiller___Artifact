import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating acosh with the mutated code', () => {
    const c = new Complex(1, 1);
    expect(() => c.acosh()).toThrowError();
  });
});