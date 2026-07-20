import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    const complex2 = new Complex(1, -2);
    const result2 = complex2.acsch();
    expect(result.re).not.toBeCloseTo(result2.re, 5);
  });
});