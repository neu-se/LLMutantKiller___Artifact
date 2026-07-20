import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for a specific value slightly above the threshold', () => {
    const complex = new Complex(1e-9 + 1e-10, 0);
    const coshValueOriginal = complex.cosh().re;
    const complexMutated = new Complex(1e-9 + 1e-10, 0);
    const coshValueMutated = complexMutated.cosh().re;
    expect(coshValueOriginal).toBeCloseTo(coshValueMutated, 15);
  });
});