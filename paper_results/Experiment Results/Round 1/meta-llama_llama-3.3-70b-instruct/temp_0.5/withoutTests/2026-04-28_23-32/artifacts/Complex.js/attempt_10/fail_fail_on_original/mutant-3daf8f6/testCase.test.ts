import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for values equal to 3000', () => {
    const complex = new Complex(3000, 0);
    const result = complex.abs();
    expect(result).toBeCloseTo(3000, 10);
  });
});