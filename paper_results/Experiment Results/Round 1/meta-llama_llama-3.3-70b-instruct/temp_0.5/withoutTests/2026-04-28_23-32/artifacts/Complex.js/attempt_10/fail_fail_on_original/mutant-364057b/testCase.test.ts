import { Complex } from '../complex';

describe('Complex', () => {
  it('should throw an error when asech is called with a = 0 and b = 0 in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrowError();
  });
});