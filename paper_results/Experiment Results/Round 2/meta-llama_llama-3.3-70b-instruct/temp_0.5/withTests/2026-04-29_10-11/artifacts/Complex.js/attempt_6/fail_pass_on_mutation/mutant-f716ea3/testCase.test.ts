import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = -0.5 and check the result is not zero', () => {
    const complex = new Complex(-0.5, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});