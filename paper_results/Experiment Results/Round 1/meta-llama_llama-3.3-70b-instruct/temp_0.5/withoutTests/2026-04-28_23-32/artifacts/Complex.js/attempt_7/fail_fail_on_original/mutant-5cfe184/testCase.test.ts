import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for positive value', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0);
  });
});