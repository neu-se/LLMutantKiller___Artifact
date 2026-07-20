import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly for small values', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const calculated = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x / 20922789888000
            - 1 / 87178291200
          ) + 1 / 479001600
        ) - 1 / 3628800
      ) + 1 / 40320
    ) - 1 / 720;
    expect(calculated).toBeCloseTo(result.re, 1e-20);
    expect(calculated * x * x).not.toBeCloseTo(result.re, 1e-10);
  });
});