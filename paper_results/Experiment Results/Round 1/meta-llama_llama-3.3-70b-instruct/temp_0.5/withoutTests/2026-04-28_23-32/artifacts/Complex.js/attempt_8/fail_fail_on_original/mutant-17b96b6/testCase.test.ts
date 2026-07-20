import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not zero', () => {
    const complex = new Complex(2, 0);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5);
    expect(result.im).toBeCloseTo(0);
  });
});