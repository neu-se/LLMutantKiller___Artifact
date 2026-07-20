import { Complex } from "../../../../../complex.js";

describe('Complex.js', () => {
  it('should correctly handle the cosm1 function', () => {
    const x = 0.01;
    const result = Complex.cosm1(x);
    expect(result).toBeCloseTo(Math.cos(x) - 1, 10);
  });
});