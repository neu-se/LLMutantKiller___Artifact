import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when a and b are 0 in asec for the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrowError();
  });
});