import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should test the behavior of the mutated file', () => {
    const c1 = new Complex(2, 0);
    const c2 = c1.atanh();
    expect(c2.re).toBeCloseTo(0.5493061443340548);
    const c3 = new Complex(1.5, 0);
    const c4 = c3.atanh();
    expect(c4.im).toBeCloseTo(-1.3268240270773398, 4);
  });
});