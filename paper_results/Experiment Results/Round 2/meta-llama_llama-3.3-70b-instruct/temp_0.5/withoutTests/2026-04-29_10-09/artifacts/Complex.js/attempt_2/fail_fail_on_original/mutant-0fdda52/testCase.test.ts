import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const result1 = Complex.hypot(3, 4);
    const result2 = Complex.hypot(4, 3);
    expect(result1).toBeCloseTo(result2);
  });
});