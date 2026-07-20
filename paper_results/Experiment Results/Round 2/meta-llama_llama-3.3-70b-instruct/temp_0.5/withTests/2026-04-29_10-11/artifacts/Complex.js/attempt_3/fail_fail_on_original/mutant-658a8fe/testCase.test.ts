import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a non-zero input', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });

  it('should throw an error for acsch when denominator is zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrow();
  });
});