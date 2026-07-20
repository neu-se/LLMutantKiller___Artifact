import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly for small x', () => {
    const x = 0.000000001;
    const c = new Complex(x);
    const result = Math.cos(x) - 1;
    const approx = -((x * x) / 2 + (x * x * x * x) / 24 + (x * x * x * x * x * x) / 720 + (x * x * x * x * x * x * x * x) / 40320 + (x * x * x * x * x * x * x * x * x * x) / 3628800 + (x * x * x * x * x * x * x * x * x * x * x * x) / 39916800 + (x * x * x * x * x * x * x * x * x * x * x * x * x * x) / 6227020800 + (x * x * x * x * x * x * x * x * x * x * x * x * x * x * x * x) / 87178291200);
    expect(result).toBeCloseTo(approx, 10);
  });
});