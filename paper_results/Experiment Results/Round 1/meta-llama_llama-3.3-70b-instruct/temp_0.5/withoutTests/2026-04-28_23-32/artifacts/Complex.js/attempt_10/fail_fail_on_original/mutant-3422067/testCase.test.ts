import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3001;
    const result1 = Complex.hypot(a, b);
    const result2 = Complex.hypot(b, a);
    if (a < b) {
      expect(result1).toBeLessThan(result2);
    } else {
      expect(result1).toBeGreaterThan(result2);
    }
  });
});