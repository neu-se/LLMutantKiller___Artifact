import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(1e-16, 0);
    const result = complex.asech();
    expect(result.re).toBeGreaterThan(0);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBe(Infinity);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result2.re)).toBe(false);
    expect(complex.asech().re).not.toBe(complex2.asech().re);
    expect(complex.asech().re).toBeGreaterThan(0);
  });
});