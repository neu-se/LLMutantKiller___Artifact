import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    expect(Complex.hypot(3000, 3001)).toBeCloseTo(Complex.hypot(3001, 3000));
  });
});