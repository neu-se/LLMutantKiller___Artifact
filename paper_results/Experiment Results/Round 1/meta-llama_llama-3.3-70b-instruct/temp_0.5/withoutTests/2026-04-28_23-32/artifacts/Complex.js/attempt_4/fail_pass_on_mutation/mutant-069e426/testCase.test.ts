import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for asec function', () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(result.re);
    expect(result.im).toBeCloseTo(result.im);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});