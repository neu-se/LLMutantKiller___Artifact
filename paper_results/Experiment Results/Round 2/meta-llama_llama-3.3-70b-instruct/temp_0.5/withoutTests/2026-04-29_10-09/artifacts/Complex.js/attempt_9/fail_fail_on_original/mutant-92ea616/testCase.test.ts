import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for non-zero values', () => {
    const c = new Complex(1, 1);
    const d = c.re * c.re + c.im * c.im;
    const result = c.acot();
    if (d !== 0) {
      expect(result.re).not.toBe(0);
      expect(result.im).not.toBe(0);
    } else {
      expect(result.re).toBe(0);
      expect(result.im).toBe(Infinity);
    }
  });
});