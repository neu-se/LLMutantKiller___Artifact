import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a non-zero real part', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});