import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 1000);
    const result = c1.div(c2['re'], c2['im']);
    expect(result['re']).toBeCloseTo((1 * 1 + 2 * 1000) / (1 * 1 + 1000 * 1000), 5);
    expect(result['im']).toBeCloseTo((2 * 1 - 1 * 1000) / (1 * 1 + 1000 * 1000), 5);
  });
});