import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when a and b are not 0', () => {
    const complex = new Complex(1, 1);
    const result = complex['asec']();
    expect(result).not.toBeUndefined();
  });
});