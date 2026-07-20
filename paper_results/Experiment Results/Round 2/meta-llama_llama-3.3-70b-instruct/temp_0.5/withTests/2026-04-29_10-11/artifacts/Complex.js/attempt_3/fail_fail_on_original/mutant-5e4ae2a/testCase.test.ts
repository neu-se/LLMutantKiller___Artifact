import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers with no imaginary part', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0);
  });
});