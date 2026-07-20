import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a complex number with a non-zero imaginary part', () => {
    const complex = new Complex(0.5, 1);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0.8813780510029725);
    expect(result.im).toBeCloseTo(-0.5403023058681398);
  });
});