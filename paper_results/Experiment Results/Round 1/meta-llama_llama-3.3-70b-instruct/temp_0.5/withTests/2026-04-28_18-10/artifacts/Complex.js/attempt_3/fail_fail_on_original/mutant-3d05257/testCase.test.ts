import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific input', () => {
    const complex = new Complex(Math.PI / 2, 0);
    const result = complex.acosh();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 4);
  });
});