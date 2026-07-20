import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle asec correctly when a and b are zero', () => {
    const complex = new Complex(0, 0);
    expect(complex.asec().toString()).toBe('0, Infinity');
  });
});