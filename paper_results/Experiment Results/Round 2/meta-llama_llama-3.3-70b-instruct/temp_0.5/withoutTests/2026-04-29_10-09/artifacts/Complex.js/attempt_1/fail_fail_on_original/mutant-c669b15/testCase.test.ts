import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for division', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, -2);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});