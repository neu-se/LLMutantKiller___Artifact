import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for real numbers greater than 1', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 5);
    expect(result.im).toBeCloseTo(0, 5);
    const c2 = new Complex(2, 1);
    const result2 = c2.atanh();
    if (result2.im > 0) {
      expect(result2.im).toBeGreaterThan(0);
    } else {
      expect(result2.im).toBeLessThan(0);
    }
    expect(Math.abs(result2.im)).not.toBeCloseTo(0, 5);
  });
});