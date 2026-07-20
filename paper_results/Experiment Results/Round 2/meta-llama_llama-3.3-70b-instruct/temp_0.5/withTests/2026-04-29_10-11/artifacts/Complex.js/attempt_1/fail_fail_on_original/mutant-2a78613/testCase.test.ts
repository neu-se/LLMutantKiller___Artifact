import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly multiply two complex numbers', () => {
    const c1 = new Complex(2, 3);
    const c2 = new Complex(4, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(8);
    expect(result.im).toBeCloseTo(0);
  });
});