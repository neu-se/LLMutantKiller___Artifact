import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});