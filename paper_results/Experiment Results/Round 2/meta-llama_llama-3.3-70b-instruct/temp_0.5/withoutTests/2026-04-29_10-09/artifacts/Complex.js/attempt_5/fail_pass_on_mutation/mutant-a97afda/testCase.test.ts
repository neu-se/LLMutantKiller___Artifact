import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atan correctly for specific input', () => {
    const complex = new Complex(1, 0);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
  });
});