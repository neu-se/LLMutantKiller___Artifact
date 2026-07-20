import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(2, 3);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(-0.9045568943023814, 5);
    expect(result.im).toBeCloseTo(-2.794513874437474, 5);
  });
});