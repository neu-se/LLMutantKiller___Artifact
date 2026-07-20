import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calculating acsc with a complex number that has a non-zero imaginary part in the mutated code', () => {
    const c = new Complex(0, 1);
    expect(() => c.acsc()).toThrowError();
  });
});