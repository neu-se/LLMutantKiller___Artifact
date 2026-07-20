import { Complex } from "../complex";

describe('Complex', () => {
  it('should return the correct result for acot with a specific input', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan(1), 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});