import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a complex number with a specific value', () => {
    const complex = new Complex(1, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0);
    expect(result['im']).toBeCloseTo(0);
    const complex2 = new Complex(0, 1);
    const result2 = complex2['asec']();
    expect(result2['re']).toBeCloseTo(Math.PI / 2);
    expect(result2['im']).toBeCloseTo(0);
  });
});