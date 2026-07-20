import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 4;
    const b = 3;
    const result = Complex.hypot(a, b);
    expect(result).toBeCloseTo(5);
  });
});