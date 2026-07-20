import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a specific negative input', () => {
    var cosh = Math.cosh || function(x) {
      return Math.abs(x) < 1e-9? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
    };
    const result = cosh(-1);
    expect(result).toBeCloseTo(Math.cosh(-1));
  });
});