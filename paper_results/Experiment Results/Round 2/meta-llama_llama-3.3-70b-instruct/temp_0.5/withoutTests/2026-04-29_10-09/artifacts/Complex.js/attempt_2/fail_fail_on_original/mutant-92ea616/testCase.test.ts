import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for non-zero values', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const d = c.re * c.re + c.im * c.im;
    if (d === 0) {
      expect(result.re).toBe(0);
      expect(result.im).toBe(0);
    } else {
      expect(result.re).not.toBe(0);
      expect(result.im).not.toBe(0);
    }
  });
});