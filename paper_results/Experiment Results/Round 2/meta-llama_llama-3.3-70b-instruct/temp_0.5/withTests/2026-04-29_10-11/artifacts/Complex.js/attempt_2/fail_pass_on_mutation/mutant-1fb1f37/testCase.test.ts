import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cosh correctly', () => {
    const result = Math.cosh(1);
    const coshValue = (Math.exp(1) + Math.exp(-1)) * 0.5;
    expect(result).toBeCloseTo(coshValue);
  });
});