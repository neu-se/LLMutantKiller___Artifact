import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for asec when called with 0, 0', () => {
    const complex = new Complex(0, 0);
    expect(complex.asec().toString()).toBe('0 Infinity');
  });
});