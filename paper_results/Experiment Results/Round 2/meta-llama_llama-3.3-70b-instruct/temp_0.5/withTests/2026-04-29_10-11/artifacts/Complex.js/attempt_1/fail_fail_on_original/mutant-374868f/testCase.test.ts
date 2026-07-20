import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0.5);
    const asech = complex.asech();
    expect(asech.re).toBeCloseTo(1.3169578969248166);
    expect(asech.im).toBeCloseTo(-0.46364760900080615);
  });
});