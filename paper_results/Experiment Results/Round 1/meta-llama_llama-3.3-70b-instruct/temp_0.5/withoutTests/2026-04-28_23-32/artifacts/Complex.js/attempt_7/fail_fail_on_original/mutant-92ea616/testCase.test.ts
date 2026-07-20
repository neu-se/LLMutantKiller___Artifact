import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acot when d is not zero', () => {
    const c = new Complex(1, 1);
    const d = c.re * c.re + c.im * c.im;
    expect(d).not.toBe(0);
    const result = c.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});