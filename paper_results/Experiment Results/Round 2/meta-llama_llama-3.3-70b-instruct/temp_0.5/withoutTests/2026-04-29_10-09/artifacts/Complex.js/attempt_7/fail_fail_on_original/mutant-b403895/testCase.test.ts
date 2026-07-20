import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a complex number with a specific value', () => {
    const complex = new Complex(2, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0.5235987755982988);
    expect(result['im']).toBeCloseTo(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2['asec']();
    expect(result2['re']).toBeCloseTo(Infinity);
    expect(result2['im']).toBeCloseTo(0);
  });
});