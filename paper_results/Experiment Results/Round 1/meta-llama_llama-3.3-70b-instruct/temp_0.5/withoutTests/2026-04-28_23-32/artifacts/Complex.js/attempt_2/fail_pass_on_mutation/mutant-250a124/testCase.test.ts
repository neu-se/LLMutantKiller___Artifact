import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2['re'], c2['im']);
    expect(result['re']).toBeCloseTo(1.5);
    expect(result['im']).toBeCloseTo(0.5);
  });
});