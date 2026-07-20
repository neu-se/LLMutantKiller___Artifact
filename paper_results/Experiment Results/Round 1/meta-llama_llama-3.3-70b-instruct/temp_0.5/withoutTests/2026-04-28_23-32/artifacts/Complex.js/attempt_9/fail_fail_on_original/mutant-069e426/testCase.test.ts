import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for asec function', () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    const result2 = c.asec();
    expect(isNaN(result.re)).toBe(true);
    expect(isFinite(result2.re)).toBe(true);
  });
});