import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const asech = complex.asech();
    const complex2 = new Complex(asech.re, asech.im);
    const asech2 = complex2.acosh();
    expect(asech2.re).toBeCloseTo(0.5);
    expect(asech2.im).toBeCloseTo(0);
  });
});