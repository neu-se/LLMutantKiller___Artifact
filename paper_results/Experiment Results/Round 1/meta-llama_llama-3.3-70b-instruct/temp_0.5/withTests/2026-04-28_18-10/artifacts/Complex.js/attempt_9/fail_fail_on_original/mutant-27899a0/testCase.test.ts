import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for atanh with a = -1', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(-1, 0);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeCloseTo(0);
  });
});