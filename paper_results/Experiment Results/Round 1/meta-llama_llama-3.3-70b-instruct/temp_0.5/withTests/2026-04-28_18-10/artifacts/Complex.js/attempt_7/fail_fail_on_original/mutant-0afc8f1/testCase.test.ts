import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when calling asech on the mutated code', () => {
    const complex = new Complex(0.5, 0);
    expect(complex.asech).toThrowError();
  });
});