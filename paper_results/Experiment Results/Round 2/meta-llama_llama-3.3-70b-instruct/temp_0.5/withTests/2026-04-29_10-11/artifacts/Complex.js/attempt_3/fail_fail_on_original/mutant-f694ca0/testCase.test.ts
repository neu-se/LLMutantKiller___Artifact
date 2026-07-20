import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const smallX = 0.01;
    const result = Complex.cosm1(smallX);
    expect(result).toBeCloseTo(Math.cos(smallX) - 1, 10);
  });
});