import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acot with b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});