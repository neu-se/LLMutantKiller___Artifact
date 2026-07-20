import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for asec(1)', () => {
    const complex = new Complex(1, 0);
    const result = complex['asec']();
    expect(result).not.toBeNull();
    expect(result['re']).not.toBeNaN();
    expect(result['im']).not.toBeNaN();
  });
});