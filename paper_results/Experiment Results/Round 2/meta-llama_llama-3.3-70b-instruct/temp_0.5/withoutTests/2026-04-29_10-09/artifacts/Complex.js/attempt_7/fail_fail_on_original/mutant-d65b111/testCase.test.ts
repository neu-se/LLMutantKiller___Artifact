import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0.5, 0.5);
    expect(complex2.asech().re).not.toBeNaN();
    expect(complex2.asech().im).not.toBeNaN();
  });
});