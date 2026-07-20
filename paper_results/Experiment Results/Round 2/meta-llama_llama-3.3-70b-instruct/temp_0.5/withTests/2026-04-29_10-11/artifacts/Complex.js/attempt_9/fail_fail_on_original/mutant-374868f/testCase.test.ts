import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const asech = complex.asech();
    const expectedRe = asech.re;
    const expectedIm = asech.im;
    expect(expectedRe).toBeCloseTo(1.3169578969248166);
    expect(expectedIm).toBeCloseTo(0);
    const complex2 = new Complex(expectedRe, expectedIm);
    const acosh = complex2.acosh();
    expect(acosh.re).toBeCloseTo(0.5);
    expect(acosh.im).toBeCloseTo(0);
    const complex3 = new Complex(acosh.re * acosh.re, acosh.im * acosh.im);
    const asech2 = complex3.asech();
    expect(asech2.re).not.toBeCloseTo(expectedRe);
    expect(asech2.im).not.toBeCloseTo(expectedIm);
  });
});