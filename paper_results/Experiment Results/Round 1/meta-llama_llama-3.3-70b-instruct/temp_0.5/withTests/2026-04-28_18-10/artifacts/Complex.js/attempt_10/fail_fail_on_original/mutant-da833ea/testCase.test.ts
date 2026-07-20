import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0);
    expect(complex.asech().re).not.toBeCloseTo(complex.asech().im * -0.5);
  });
});