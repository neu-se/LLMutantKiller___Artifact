import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function with division by zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});