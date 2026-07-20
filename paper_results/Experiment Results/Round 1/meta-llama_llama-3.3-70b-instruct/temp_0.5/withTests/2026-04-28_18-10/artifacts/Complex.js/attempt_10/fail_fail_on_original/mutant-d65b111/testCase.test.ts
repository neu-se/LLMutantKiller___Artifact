import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const expected = Math.log((1 + Math.sqrt(1 - 0.5 * 0.5)) / 0.5);
    expect(result.re).toBeCloseTo(expected);
    expect(result.im).toBeCloseTo(0);
  });
});