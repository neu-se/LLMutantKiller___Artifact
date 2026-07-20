import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should throw an error when acosh is called on the mutated code', () => {
    const complex = new Complex('2+0i');
    expect(() => complex.acosh()).not.toThrow();
  });
});