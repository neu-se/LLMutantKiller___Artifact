import { Complex } from '../../complex';

describe('Complex.js', () => {
  it('should throw an error when a is 0 and b is 1 or -1 in the mutated code', () => {
    const complex1 = new Complex(0, 1);
    expect(() => complex1.atan()).toThrowError();
  });
});