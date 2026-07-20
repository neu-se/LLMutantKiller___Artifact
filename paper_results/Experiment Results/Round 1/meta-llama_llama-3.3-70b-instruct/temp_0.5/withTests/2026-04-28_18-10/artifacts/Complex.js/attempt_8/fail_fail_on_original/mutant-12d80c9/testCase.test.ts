import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating the complex asech for a = 0 in the mutated code', () => {
    const c = new Complex(0, 1);
    expect(() => c.asech()).toThrowError();
  });
});