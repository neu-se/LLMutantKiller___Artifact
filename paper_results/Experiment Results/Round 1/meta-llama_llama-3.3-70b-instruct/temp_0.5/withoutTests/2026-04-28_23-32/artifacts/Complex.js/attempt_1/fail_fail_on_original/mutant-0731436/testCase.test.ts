import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(0, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0, 10);
    expect(result['im']).toBeCloseTo(Infinity, 10);
  });
});