import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const result = Complex.hypot(3, 4);
    expect(result).toBeCloseTo(5);
  });
});