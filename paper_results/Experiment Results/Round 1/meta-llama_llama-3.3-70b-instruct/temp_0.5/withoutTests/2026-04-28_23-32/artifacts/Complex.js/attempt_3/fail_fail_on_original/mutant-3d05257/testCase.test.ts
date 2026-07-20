import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex(Math.PI, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.acosh(Math.E));
  });
});