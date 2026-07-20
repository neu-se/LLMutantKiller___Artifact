import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.cosh();
    expect(result.re).toBeGreaterThan(3.5);
  });
});