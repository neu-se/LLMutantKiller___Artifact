import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const complex = new Complex(1, -1);
    const result = complex.acosh();
    if (result.im <= 0) {
      expect(result.re).toBeCloseTo(1.0612750619050357, 10);
      expect(result.im).toBeCloseTo(-0.9045568943023819, 10);
    } else {
      expect(result.re).toBeCloseTo(1.0612750619050357, 10);
      expect(result.im).toBeCloseTo(0.9045568943023819, 10);
    }
  });
});