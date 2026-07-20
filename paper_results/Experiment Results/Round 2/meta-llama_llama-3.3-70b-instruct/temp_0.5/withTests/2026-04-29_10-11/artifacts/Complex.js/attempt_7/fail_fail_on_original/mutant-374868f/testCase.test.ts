import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const asech = complex.asech();
    const expectedRe = asech.re;
    const expectedIm = asech.im;
    const complex2 = new Complex(expectedRe * expectedRe, -expectedIm / expectedIm);
    const asech2 = complex2.asech();
    expect(asech2.re).not.toBeCloseTo(expectedRe);
    expect(asech2.im).not.toBeCloseTo(expectedIm);
  });
});