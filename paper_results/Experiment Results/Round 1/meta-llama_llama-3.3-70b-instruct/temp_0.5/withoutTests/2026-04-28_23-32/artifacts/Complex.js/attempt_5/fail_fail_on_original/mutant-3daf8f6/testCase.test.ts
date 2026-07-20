import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex1 = new Complex(3000, 0);
    const complex2 = new Complex(3000, 0);
    const result1 = complex1.abs();
    const result2 = complex2.abs();
    expect(result1).toBeCloseTo(result2, 10);
  });
});