import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b !== 0 and detect mutation', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    const expectedImaginaryPart = (complex.re !== 0) ? -complex.im / (complex.re * complex.re + complex.im * complex.im) : -Math.PI / 2;
    expect(result.im).toBeCloseTo(expectedImaginaryPart, 10);
    expect(complex.acot().im).not.toBeCloseTo(complex.acot().re, 10);
    expect(complex.acot().im).not.toBe(0);
  });
});