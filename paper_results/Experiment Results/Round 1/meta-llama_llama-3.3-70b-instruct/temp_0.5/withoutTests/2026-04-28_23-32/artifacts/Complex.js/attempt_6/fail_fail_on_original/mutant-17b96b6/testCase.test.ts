import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not zero and b is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});