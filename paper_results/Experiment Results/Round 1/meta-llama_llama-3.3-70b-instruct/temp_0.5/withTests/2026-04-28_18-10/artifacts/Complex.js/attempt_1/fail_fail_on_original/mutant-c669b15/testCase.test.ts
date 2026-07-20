import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate division of complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(1.5, 10);
    expect(result.im).toBeCloseTo(0.5, 10);
  });
});