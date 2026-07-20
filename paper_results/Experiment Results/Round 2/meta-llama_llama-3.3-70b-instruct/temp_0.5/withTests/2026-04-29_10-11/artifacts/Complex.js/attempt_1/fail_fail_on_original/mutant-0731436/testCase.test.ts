import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});