import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a complex number with zero real part', () => {
    const complex = new Complex(0, 1);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(Math.PI / 2);
    expect(result['im']).toBeCloseTo(0);
  });
});