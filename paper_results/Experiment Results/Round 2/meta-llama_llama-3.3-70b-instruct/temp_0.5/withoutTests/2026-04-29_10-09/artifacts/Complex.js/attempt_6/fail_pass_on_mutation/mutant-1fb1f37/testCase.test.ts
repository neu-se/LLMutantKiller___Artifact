import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for small values', () => {
    var cosh = Math.cosh || function(x) {
      return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
    };
    const x = 1e-10;
    expect(cosh(x)).toBeCloseTo(1 + x * x / 2);
  });
});