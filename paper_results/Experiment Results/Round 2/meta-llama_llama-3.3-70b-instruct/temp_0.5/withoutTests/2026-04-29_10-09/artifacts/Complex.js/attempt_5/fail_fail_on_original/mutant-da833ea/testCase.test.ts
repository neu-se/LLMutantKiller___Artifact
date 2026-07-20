import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const resultOriginal = complex.acosh();
    const result = complex.asech();
    expect(result.re).toBeCloseTo(Math.log((1 + Math.sqrt(1 - 0.5 * 0.5)) / 0.5));
    expect(result.im).toBeCloseTo(0);
  });
});