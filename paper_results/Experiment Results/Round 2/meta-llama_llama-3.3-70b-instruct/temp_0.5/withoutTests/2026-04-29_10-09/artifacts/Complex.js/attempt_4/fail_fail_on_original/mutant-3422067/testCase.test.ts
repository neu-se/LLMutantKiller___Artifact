import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const complex = new Complex(3001, 3000);
    const result = complex.abs();
    expect(result).toBeCloseTo(4242.6407, 4);
  });
});