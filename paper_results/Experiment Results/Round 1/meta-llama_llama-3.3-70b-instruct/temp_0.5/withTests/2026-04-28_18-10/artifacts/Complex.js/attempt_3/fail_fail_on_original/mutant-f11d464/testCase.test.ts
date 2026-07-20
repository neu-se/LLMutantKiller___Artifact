import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly handle fully imaginary base in pow function', () => {
    const complex = new Complex(0, 1);
    const result = complex.pow(2);
    expect(result.re).toBeCloseTo(-1);
    expect(result.im).toBeCloseTo(0);
  });

  it('should calculate the power of a complex number with a fully imaginary base', () => {
    const complex = new Complex(0, 1);
    const result = complex.pow(4);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});