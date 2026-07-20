import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const d = 1 * 1 - 1 * 1;
    if (d === 0) {
      expect(result.re).toBeNaN();
      expect(result.im).toBeNaN();
    } else {
      expect(result.re).not.toBeNaN();
      expect(result.im).not.toBeNaN();
    }
  });
});