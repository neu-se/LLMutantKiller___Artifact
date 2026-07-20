import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for negative real numbers with the correct sign for the imaginary part', () => {
    const complex = new Complex(-2, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
    if (result.re > 0) {
      expect(result.im).toBeLessThan(0);
    } else {
      expect(result.im).toBeGreaterThan(0);
    }
  });
});