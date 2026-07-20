import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for hypot function when a is greater than b', () => {
    const complex = new Complex(4, 3);
    const result = complex.abs();
    const expected = Math.sqrt(4*4 + 3*3);
    expect(result).toBeCloseTo(expected, 10);
  });
});