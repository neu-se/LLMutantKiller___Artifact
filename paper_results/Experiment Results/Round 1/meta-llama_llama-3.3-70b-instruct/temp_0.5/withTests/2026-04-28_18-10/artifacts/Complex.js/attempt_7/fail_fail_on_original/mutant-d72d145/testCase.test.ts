import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(2, 2);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0.19891236737965803, 10);
    expect(result.im).toBeCloseTo(-0.19891236737965803, 10);
  });
});