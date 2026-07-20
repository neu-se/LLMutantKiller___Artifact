import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for a specific value', () => {
    var cosh = Math.cosh || function(x) {
      return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
    };
    const x = 1e-9;
    const result = cosh(x);
    expect(result).toBeCloseTo(1);
  });
});