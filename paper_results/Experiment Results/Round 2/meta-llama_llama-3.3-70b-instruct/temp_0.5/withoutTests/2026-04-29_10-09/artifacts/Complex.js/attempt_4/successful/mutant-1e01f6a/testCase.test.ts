import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for a value greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});