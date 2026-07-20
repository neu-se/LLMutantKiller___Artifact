import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
    const b = 0;
    if (b !== 0) {
      expect(b).toBeGreaterThan(0);
    } else {
      expect(b).toBeLessThan(1);
    }
  });
});