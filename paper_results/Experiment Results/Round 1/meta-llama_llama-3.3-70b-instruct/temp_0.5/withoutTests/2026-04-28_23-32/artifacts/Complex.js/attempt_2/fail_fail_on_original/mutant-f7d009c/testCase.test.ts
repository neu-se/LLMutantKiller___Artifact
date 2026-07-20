import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const result1 = Complex.hypot(3000, 3000);
    const result2 = Math.sqrt(3000 * 3000 + 3000 * 3000);
    expect(result1).toBeCloseTo(result2, 10);
  });
});