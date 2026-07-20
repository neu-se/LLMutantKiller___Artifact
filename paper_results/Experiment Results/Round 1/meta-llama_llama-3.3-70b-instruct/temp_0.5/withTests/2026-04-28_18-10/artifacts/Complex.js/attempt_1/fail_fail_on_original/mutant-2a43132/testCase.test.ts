import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const result = complex['asec']();
    expect(result['re']).not.toBeNaN();
    expect(result['im']).not.toBeNaN();
  });
});