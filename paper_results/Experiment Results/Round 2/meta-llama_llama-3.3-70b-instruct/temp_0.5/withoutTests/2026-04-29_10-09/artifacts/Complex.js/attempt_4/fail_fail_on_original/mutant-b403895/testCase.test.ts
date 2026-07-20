import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex['asec']();
    const originalResult = new Complex(Math.PI / 2 - Math.log(Math.sqrt(2)), 0);
    expect(result['re']).toBeCloseTo(originalResult['re']);
    expect(result['im']).toBeCloseTo(originalResult['im']);
  });
});