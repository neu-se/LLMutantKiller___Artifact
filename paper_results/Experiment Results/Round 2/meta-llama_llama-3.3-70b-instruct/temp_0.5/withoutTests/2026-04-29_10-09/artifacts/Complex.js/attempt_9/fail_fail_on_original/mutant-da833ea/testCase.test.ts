import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const complex2 = new Complex(0.5, 0.5);
    const result2 = complex2.asech();
    expect(result.im).toBeCloseTo(0);
    expect(result2.im).not.toBeCloseTo(result.im);
  });
});