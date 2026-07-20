import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific case', () => {
    const complex = new Complex(1, 1);
    const result = complex.acosh();
    expect(result.im).toBeGreaterThan(0);
  });
});