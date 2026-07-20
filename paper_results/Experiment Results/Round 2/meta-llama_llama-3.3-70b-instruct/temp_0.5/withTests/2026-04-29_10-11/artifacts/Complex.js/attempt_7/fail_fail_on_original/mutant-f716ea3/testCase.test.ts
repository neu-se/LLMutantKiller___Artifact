import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = -1.1 and check the result is not NaN', () => {
    const complex = new Complex(-1.1, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0, 10);
  });
});