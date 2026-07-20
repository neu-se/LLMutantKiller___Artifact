import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(isFinite(result.im)).toBe(false);
  });
});