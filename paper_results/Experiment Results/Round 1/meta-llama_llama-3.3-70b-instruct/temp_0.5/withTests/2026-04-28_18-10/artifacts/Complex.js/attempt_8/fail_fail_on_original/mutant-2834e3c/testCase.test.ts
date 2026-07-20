import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calculating the complex asech with b = 0 and a = 0 in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrowError();
  });
});