import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a non-zero complex number', () => {
    const complex = new Complex(2, 0);
    const result = complex['asec']();
    expect(result['re']).toBeCloseTo(0.5235987755982988);
    expect(result['im']).toBeCloseTo(0);
  });
});