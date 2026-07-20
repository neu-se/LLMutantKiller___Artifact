import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const asechOriginal = complex.asech();
    const a = asechOriginal.re;
    const b = asechOriginal.im;
    const complex2 = new Complex(a * b, -b / b);
    const asechMutated = complex2.asech();
    expect(asechMutated.re).not.toBeCloseTo(a);
    expect(asechMutated.im).not.toBeCloseTo(b);
  });
});