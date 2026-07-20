import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});