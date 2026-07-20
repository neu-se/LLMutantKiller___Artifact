import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for hypot function when a is less than b', () => {
    const result1 = Complex.hypot(3, 4);
    const result2 = Complex.hypot(4, 3);
    expect(result1).toBeCloseTo(result2, 10);
  });
});