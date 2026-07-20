import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(2, 0);
    const result = complex.cosh();
    expect(result.re).toBeGreaterThan(3.63);
    expect(result.im).toBeCloseTo(0);
  });
});