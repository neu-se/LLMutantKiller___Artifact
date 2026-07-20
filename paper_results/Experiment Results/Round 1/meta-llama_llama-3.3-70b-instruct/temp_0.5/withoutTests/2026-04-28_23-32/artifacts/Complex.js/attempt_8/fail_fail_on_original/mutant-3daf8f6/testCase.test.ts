import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for values equal to 3000', () => {
    const complex = new Complex(3000, 0);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3000 * 3000 + 0 * 0), 10);
  });
});