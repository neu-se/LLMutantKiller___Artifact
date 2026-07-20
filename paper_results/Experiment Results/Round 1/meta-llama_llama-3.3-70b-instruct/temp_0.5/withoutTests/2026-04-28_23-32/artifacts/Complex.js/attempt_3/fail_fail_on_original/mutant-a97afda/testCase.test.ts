import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle the case where b is 1 in the atan function', () => {
    const complex1 = new Complex(0, 1);
    const result1 = complex1.atan();
    expect(result1.re).toBeCloseTo(0, 10);
    expect(result1.im).toBeCloseTo(Infinity, 10);

    const complex2 = new Complex(0, 0);
    const result2 = complex2.atan();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});