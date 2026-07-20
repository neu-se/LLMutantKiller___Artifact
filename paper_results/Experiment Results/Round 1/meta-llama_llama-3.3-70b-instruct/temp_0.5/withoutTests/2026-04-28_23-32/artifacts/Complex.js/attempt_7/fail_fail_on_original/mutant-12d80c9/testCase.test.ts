import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle asech correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});