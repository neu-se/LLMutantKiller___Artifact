import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const c = new Complex(3, 4);
    const result = c.abs();
    expect(result).toBeCloseTo(5);
    const c2 = new Complex(4, 3);
    const result2 = c2.abs();
    expect(result2).toBeCloseTo(5);
    expect(result).toBeCloseTo(result2);
  });
});