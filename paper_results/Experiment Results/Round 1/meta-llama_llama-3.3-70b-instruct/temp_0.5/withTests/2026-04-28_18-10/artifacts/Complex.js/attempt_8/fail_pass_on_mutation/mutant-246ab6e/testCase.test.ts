import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a specific input where the mutation has an effect', () => {
    const complex = new Complex(-1, 0);
    const result = complex.cosh();
    const expected = Math.cosh(-1);
    expect(result.re).toBeCloseTo(expected);
    expect(result.im).toBeCloseTo(0);
  });
});