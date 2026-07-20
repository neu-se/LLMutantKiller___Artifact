import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const complex = new Complex(3001, 3000);
    const result = complex.abs();
    const complex2 = new Complex(3000, 3001);
    const result2 = complex2.abs();
    expect(result).not.toBeCloseTo(result2, 4);
  });
});