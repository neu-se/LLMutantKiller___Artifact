import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const result = Complex.hypot(3000, 3000);
    expect(result).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000), 10);
    expect(Complex.hypot(3000, 3000)).not.toBeCloseTo(Math.sqrt(3000 * 3000 + 3001 * 3001), 10);
  });
});