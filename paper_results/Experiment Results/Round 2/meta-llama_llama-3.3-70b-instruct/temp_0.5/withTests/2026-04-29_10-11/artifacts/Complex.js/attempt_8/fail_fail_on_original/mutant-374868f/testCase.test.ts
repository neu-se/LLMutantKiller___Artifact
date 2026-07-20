import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const asech = complex.asech();
    expect(asech.re).toBeCloseTo(1.3169578969248166);
    expect(asech.im).toBeCloseTo(0);
    const complex2 = new Complex(asech.re, asech.im);
    const acosh = complex2.acosh();
    expect(acosh.re).toBeCloseTo(0.5);
    expect(acosh.im).toBeCloseTo(0);
  });
});