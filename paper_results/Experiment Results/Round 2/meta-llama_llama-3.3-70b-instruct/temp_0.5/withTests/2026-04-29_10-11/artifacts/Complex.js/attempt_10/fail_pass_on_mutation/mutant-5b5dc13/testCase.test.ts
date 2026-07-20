import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a non-zero value', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.5306375309525179);
    expect(result.im).toBeCloseTo(-0.45227844715119064);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.acsch();
    expect(result2.re).toBeCloseTo(0.5306375309525179);
    expect(result2.im).toBeCloseTo(-0.45227844715119064);
    expect(result.re).toBeCloseTo(result2.re);
    expect(result.im).toBeCloseTo(result2.im);
  });
});