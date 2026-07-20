import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1.1e-9);
    const result = complex.cosh();
    expect(result.re).not.toBeCloseTo(1 - 1.1e-9, 10);
  });
});