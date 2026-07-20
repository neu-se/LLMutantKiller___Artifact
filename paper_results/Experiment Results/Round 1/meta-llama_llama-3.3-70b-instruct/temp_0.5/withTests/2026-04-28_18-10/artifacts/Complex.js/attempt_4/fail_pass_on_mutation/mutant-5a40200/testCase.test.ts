import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1e-9);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1.0000000005, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});