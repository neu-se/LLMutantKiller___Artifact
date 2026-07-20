import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific input', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0, 4);
  });
});