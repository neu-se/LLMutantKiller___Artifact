import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a complex number with a specific value', () => {
    const complex = new Complex(1, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0);
    expect(result['im']).toBeCloseTo(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2['asec']();
    expect(result2['re']).toBeCloseTo(Infinity);
    expect(result2['im']).toBeCloseTo(0);
    const complex3 = new Complex(2, 0);
    const result3 = complex3['asec']();
    expect(result3['re']).toBeCloseTo(1.0471975511965976);
    expect(result3['im']).toBeCloseTo(0);
  });
});