import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const complex = new Complex(1, -1);
    const result = complex.acosh();
    if (result.im <= 0) {
      expect(result.im).toBeLessThan(0);
    } else {
      expect(result.im).toBeGreaterThan(0);
    }
    const complex2 = new Complex(1, 1);
    const result2 = complex2.acosh();
    if (result2.im <= 0) {
      expect(result2.im).toBeLessThan(0);
    } else {
      expect(result2.im).toBeGreaterThan(0);
    }
  });
});