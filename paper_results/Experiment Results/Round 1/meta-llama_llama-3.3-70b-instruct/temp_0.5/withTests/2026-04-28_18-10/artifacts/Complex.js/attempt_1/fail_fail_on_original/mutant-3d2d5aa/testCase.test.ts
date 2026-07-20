import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly for non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});