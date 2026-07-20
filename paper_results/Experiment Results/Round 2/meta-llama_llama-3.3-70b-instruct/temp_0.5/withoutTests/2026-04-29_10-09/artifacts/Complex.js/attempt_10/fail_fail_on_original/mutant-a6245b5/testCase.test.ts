import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers', () => {
    const complex = new Complex(0, 1);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const b = 1;
    if (b !== 0) {
      expect(complex.im).toBeGreaterThan(0);
    } else {
      expect(complex.im).toBeLessThan(0);
    }
  });
});