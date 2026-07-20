import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for asec function', () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    expect(isFinite(result.re)).toBe(true);
    const c2 = new Complex(0, 0);
    const result2 = c2.asec();
    expect(isFinite(result2.re)).toBe(false);
  });
});