import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(1, 0);
    const coshValue = Math.cosh(1);
    expect(complex.cosh().re).toBeCloseTo(coshValue);
  });
});