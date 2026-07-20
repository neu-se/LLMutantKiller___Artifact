import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const complex = new Complex(3001, 3001);
    const result = complex.abs();
    expect(result).toBeCloseTo(4242.640768961651, 4);
    const complex2 = new Complex(3000, 3001);
    const result2 = complex2.abs();
    expect(result2).toBeCloseTo(4242.640768961651, 4);
  });
});