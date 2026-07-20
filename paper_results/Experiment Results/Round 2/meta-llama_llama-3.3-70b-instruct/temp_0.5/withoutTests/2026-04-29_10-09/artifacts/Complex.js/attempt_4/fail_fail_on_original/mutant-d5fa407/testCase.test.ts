import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b !== 0 and detect mutation', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    const expectedImaginaryPart = (complex.re !== 0) ? -complex.im / (complex.re * complex.re + complex.im * complex.im) : -Math.PI / 2;
    expect(result.im).not.toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expectedImaginaryPart, 10);
  });
});