import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when a and b are 0', () => {
    const complex = new Complex(0, 0);
    const result = complex['asec']();
    expect(result['re']).toBe(0);
    expect(result['im']).toBe(Infinity);
  });
});