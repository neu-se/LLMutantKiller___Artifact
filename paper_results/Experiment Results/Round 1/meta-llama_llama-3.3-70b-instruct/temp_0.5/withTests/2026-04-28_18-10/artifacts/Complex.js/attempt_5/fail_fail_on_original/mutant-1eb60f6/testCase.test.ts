import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calculating acsc for zero input in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).toThrow();
  });
});