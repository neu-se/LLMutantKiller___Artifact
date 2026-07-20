import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle acsc correctly for non-zero and non-infinity values', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    const expected = new Complex(c.re / (c.re * c.re + c.im * c.im), -c.im / (c.re * c.re + c.im * c.im)).asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});