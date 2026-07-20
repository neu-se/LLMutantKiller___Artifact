import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atan correctly for specific input', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).atan();
    const result = complex.atan();
    expect(result.re).not.toBeCloseTo(resultOriginal.re, 10);
  });
});