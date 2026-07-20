import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0, 15);
    expect(result['im']).toBeCloseTo(0, 15);
    const complex2 = new Complex(0, 0);
    const result2 = complex2['asec']();
    expect(result2['re']).toBeCloseTo(0, 15);
    expect(result2['im']).toBeCloseTo(Infinity, 15);
  });
});