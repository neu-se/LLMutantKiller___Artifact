import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1.1e-9, 0);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1.00000000005, 10);
  });
});