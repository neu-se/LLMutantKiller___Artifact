import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for a specific value slightly above the threshold', () => {
    const complex = new Complex(1e-9 + 1e-20, 0);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo((Math.exp(1e-9 + 1e-20) + Math.exp(-(1e-9 + 1e-20))) * 0.5, 15);
  });
});