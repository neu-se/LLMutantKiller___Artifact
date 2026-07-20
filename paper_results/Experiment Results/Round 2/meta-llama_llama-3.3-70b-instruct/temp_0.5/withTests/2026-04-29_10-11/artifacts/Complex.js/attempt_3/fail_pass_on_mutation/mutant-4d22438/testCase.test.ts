import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for hypot function when a is less than b', () => {
    const result = Math.hypot(3, 4);
    expect(result).toBeCloseTo(5, 10);
  });
});