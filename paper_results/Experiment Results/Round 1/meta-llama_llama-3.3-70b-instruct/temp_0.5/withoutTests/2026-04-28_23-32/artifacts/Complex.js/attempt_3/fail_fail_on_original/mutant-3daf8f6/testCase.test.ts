import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 0;
    const resultOriginal = Math.sqrt(a * a + b * b);
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(resultOriginal, 10);
  });
});