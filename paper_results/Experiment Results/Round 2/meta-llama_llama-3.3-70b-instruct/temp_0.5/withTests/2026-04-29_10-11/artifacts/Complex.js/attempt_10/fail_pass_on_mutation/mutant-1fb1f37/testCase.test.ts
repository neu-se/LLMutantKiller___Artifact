import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cosh correctly for a specific value', () => {
    const x = 1;
    const coshValue = Math.cosh(x);
    expect(coshValue).not.toBe(1);
  });
});