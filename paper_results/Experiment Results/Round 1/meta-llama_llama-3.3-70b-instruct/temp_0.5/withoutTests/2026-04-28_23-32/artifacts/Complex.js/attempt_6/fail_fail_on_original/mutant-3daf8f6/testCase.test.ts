import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for values less than 3000', () => {
    const complex = new Complex(2999, 2999);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(2999 * 2999 + 2999 * 2999), 10);
  });
});