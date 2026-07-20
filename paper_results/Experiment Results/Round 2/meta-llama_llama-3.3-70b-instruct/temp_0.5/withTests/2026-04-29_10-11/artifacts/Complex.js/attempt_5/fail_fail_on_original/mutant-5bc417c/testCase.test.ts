import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when acoth is called with a zero denominator in the original code but not in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acoth()).toThrow();
  });
});