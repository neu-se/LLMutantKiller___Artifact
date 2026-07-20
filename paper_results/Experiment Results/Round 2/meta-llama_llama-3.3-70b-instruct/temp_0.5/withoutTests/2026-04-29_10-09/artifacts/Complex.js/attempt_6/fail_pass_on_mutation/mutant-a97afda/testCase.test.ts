import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atan correctly for specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(1.0172219678978514, 10);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.atan();
    expect(result.re).not.toBeCloseTo(result2.re, 10);
  });
});