import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const result = complex['asec']();
    expect(result).toBeInstanceOf(Complex);
    expect(result['re']).not.toBeNaN();
    expect(result['im']).not.toBeNaN();
  });
});