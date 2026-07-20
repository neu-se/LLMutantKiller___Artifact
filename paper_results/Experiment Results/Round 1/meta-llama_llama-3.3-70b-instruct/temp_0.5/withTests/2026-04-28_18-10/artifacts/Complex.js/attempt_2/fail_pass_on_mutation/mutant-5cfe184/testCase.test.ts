import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should test the behavior of the mutated file', () => {
    const c1 = new Complex(2, 0);
    const c2 = c1.atanh();
    expect(c2.im).toBeCloseTo(-1.5707963267948966);
  });
});