import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should test the behavior of the mutated file', () => {
    const c1 = new Complex(2, 0);
    const c2 = c1.atanh();
    const c3 = new Complex(1.5, 0);
    const c4 = c3.atanh();
    expect(c4.im).toBeCloseTo(-1.5707963267948966);
  });
});