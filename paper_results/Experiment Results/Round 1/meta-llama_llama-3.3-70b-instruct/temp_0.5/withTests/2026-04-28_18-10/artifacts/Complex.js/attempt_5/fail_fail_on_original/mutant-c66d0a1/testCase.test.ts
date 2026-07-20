import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const c = new Complex(1, 2);
    const d = c.acsc();
    expect(d.re).not.toBe(0);
    expect(d.im).not.toBe(0);
  });
});