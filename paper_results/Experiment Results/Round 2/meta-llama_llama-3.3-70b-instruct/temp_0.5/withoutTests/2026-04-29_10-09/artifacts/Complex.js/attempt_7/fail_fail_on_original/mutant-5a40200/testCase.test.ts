import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for a specific value at the threshold', () => {
    const complex = new Complex(1e-9, 0);
    const coshValueOriginal = (Math.exp(1e-9) + Math.exp(-1e-9)) * 0.5;
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1, 15);
    expect(coshValue).not.toBeCloseTo(coshValueOriginal, 15);
  });
});