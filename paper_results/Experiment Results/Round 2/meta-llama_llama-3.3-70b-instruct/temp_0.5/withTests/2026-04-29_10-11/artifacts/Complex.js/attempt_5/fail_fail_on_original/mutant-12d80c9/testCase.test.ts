import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle asech calculation', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
    expect(complex.asech().re).not.toBeNaN();
    expect(complex.asech().re).not.toBeInfinity();
  });
});