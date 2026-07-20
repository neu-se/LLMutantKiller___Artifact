import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).toBeCloseTo(c.re / (c.re * c.re + c.im * c.im), 10);
    expect(result.im).toBeCloseTo(-c.im / (c.re * c.re + c.im * c.im), 10);
  });
});