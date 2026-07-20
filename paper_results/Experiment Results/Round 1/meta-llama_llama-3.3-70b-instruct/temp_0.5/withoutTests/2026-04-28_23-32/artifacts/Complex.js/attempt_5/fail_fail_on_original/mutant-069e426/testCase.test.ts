import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for asec function', () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    expect(isFinite(result.re)).toBe(false);
    expect(isFinite(result.im)).toBe(true);
  });
});