import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0.46364760900080615);
  });
});