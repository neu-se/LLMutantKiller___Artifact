import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for atanh with a = -1.1', () => {
    const complex = new Complex(-1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});