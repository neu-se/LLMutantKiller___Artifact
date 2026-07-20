import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly multiply two complex numbers with zero imaginary part', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(2, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(2);
    expect(result.im).toBe(0);
  });
});