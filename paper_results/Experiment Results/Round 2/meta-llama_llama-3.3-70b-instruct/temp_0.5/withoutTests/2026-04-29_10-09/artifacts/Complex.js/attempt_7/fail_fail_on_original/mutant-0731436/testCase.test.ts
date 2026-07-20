import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(0, 1);
    const result = c['asec']();
    expect(result['re']).not.toBeNaN();
    expect(result['im']).toBeCloseTo(Math.PI / 2, 5);
  });
});