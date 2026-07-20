import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for a specific value slightly below the threshold', () => {
    const complex = new Complex(1e-9 - 1e-20, 0);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1 - (1e-9 - 1e-20), 15);
  });
});