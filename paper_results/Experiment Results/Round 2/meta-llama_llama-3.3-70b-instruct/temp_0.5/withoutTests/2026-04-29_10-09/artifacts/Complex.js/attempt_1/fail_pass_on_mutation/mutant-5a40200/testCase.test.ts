import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(1e-10, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(1, 15);
    expect(coshValue.im).toBeCloseTo(0, 15);
  });
});