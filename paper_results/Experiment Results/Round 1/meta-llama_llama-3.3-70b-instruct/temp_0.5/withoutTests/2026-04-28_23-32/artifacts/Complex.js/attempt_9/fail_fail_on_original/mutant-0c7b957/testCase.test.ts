import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for complex number (0.5, 0.5)', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.549, 3);
    expect(result.im).toBeCloseTo(0.549, 3);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});