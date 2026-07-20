import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 0);
    const originalResult = complex['asec']();
    expect(originalResult['re']).not.toBeCloseTo(0, 10);
    expect(originalResult['im']).not.toBeCloseTo(0, 10);
  });
});