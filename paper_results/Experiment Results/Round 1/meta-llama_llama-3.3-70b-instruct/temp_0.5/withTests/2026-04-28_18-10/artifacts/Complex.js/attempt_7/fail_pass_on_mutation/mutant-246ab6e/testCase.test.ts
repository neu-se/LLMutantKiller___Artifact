import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a specific input where the mutation has an effect', () => {
    const complex = new Complex(-1e-9, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1 - (-1e-9));
    expect(result.im).toBeCloseTo(0);
  });
});