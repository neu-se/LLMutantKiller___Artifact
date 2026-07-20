import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});