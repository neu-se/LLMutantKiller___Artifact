import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a complex number with a specific value', () => {
    const complex = new Complex(0.5, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(1.0471975511965976);
    expect(result['im']).toBeCloseTo(0);
  });
});