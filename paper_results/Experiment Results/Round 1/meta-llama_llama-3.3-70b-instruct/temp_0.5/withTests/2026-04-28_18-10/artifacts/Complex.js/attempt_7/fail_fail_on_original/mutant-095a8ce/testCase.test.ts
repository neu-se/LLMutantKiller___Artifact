import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for asec(1)', () => {
    const complex = new Complex(1, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0, 10);
  });
});